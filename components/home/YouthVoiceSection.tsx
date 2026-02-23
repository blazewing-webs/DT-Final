"use client";

import { Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        quote: "இன்றைய இளைஞர்களே\nநாளைய",
        highlight: "தலைவர்கள்",
        sub: "எதிர்காலம் நம் கையில். வரலாறு படைக்க வாருங்கள்.",
    },
    en: {
        quote: "Today's Youth Are\nTomorrow's",
        highlight: "Leaders",
        sub: "The future is in our hands. Come, let us make history.",
    },
};

export default function YouthVoiceSection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;
    const [line1, line2] = t.quote.split("\n");

    return (
        <section
            className="py-32 bg-fixed bg-cover bg-center relative"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000)" }}
        >
            <div className="absolute inset-0 bg-black/70" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <Mic className="w-16 h-16 text-dravida-red mx-auto mb-8 animate-pulse" />
                <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
                    "{line1}<br />{line2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{t.highlight}</span>"
                </h2>
                <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto italic font-serif">
                    {t.sub}
                </p>
            </div>
        </section>
    );
}
