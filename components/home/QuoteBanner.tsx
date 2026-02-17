"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Quote } from "lucide-react";

interface QuoteBannerProps {
    quote?: string;
    author?: string;
}

export default function QuoteBanner({ quote: propQuote, author: propAuthor }: QuoteBannerProps) {
    const [quote, setQuote] = useState({ text: propQuote || "மனிதனை மனிதனாக மதிக்காத எந்த சமுதாயமும் முன்னேறாது.", author: propAuthor || "தந்தை பெரியார்" }); // Default fallback

    useEffect(() => {
        if (propQuote) return;

        const fetchQuote = async () => {
            // In a real app, you might want to fetch random or specific "daily" quote
            // Here we just fetch the latest one for simplicity, or modify to random
            try {
                const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"), limit(5));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docs = querySnapshot.docs;
                    const randomDoc = docs[Math.floor(Math.random() * docs.length)];
                    setQuote(randomDoc.data() as any);
                }
            } catch (error) {
                console.error("Error fetching quote:", error);
            }
        };
        fetchQuote();
    }, []);

    return (
        <section className="bg-neutral-50 text-neutral-900 py-12 md:py-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-dravida-red/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-dravida-red/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <div className="inline-flex justify-center mb-6">
                    <div className="bg-dravida-red/10 p-4 rounded-full">
                        <Quote className="h-8 w-8 text-dravida-red" />
                    </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold font-heading mb-6 leading-tight max-w-4xl mx-auto text-neutral-800">
                    “{quote.text}”
                </h2>
                <cite className="text-xl md:text-2xl text-neutral-600 font-medium not-italic">
                    – {quote.author}
                </cite>
            </div>
        </section>
    );
}
