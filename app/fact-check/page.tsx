"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";

interface FactCheckItem {
    id: string;
    claim: string;
    verdict: "True" | "False" | "Misleading";
    explanation: string;
    imageUrl: string;
    createdAt: any;
}

export default function FactCheckPage() {
    const [items, setItems] = useState<FactCheckItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, "fact_checks"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as FactCheckItem[];
                setItems(data);
            } catch (error) {
                console.error("Error fetching fact checks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="உண்மை சரிபார்ப்பு (Fact Check)"
                description="வதந்திகளை நம்பாதீர். உண்மையை அறிவோம்."
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Fact Check", href: "/fact-check" },
                ]}
            />

            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <CheckCircle className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No Fact Checks Found</h3>
                        <p className="text-neutral-500">Stay tuned for updates.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 order-2 md:order-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-2
                                                ${item.verdict === "False" ? "bg-red-100 text-red-700" :
                                                    item.verdict === "Misleading" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-green-100 text-green-700"}`}>
                                                {item.verdict === "False" && <XCircle className="w-4 h-4" />}
                                                {item.verdict === "Misleading" && <AlertTriangle className="w-4 h-4" />}
                                                {item.verdict === "True" && <CheckCircle className="w-4 h-4" />}
                                                {item.verdict === "False" ? "FAKE NEWS" : item.verdict.toUpperCase()}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                            <span className="text-neutral-500 font-medium text-base block mb-1">Claim:</span>
                                            {item.claim}
                                        </h3>

                                        <div className="bg-neutral-50 p-4 rounded-lg border-l-4 border-neutral-300">
                                            <p className="font-bold text-neutral-700 mb-1">Fact / Context:</p>
                                            <p className="text-neutral-600 leading-relaxed">{item.explanation}</p>
                                        </div>
                                    </div>

                                    {item.imageUrl && (
                                        <div className="w-full md:w-64 h-48 md:h-auto bg-neutral-100 rounded-lg overflow-hidden shrink-0 order-1 md:order-2">
                                            <img src={item.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
