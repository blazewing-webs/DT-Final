"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export default function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const q = query(collection(db, "faqs"), orderBy("createdAt", "asc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as FAQ[];
                setFaqs(data);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-white min-h-[400px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </section>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-neutral-900 font-heading mb-12">
                    கேள்வி – பதில்கள்
                </h2>

                <div className="space-y-4">
                    {faqs.map((item, idx) => (
                        <div key={item.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-5 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
                            >
                                <span className="font-bold text-neutral-900">{item.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="h-5 w-5 text-dravida-red" />
                                ) : (
                                    <Plus className="h-5 w-5 text-neutral-400" />
                                )}
                            </button>
                            {openIndex === idx && (
                                <div className="p-5 bg-white border-t border-neutral-100 text-neutral-600 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
