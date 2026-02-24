"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        heading: "சிந்திக்கத் தயாரா?",
        sub: "மாற்றத்தை உருவாக்க விரும்புகிறீர்களா? இன்றே திராவிட தலைமுறையில் இணைவோம்.",
        btn1: "இப்போதே இணையுங்கள்",
        btn2: "எங்கள் திட்டங்கள்",
        future: ["✨ Podcast தொடக்கம்", "📢 தமிழ் Blog Expansion", "🎓 மாணவர்களுக்கான Workshops"],
        disclaimer: "இந்த இணையதளத்தில் வெளியிடப்படும் கருத்துகள், அந்த எழுத்தாளரின் தனிப்பட்ட கருத்தாக இருக்கலாம். திராவிட தலைமுறை எந்த சட்டப்பொறுப்பையும் ஏற்காது.",
        note: "பொறுப்புத் துறப்பு:",
    },
    en: {
        heading: "Ready to Think?",
        sub: "Do you want to create change? Join Diravida Thalaimurai today.",
        btn1: "Join Us Now",
        btn2: "Our Initiatives",
        future: ["✨ Podcast Launch", "📢 Tamil Blog Expansion", "🎓 Workshops for Students"],
        disclaimer: "The views and opinions expressed on this website are solely those of the respective authors. Diravida Thalaimurai does not accept any legal responsibility for such individual opinions or expressions.",
        note: "Disclaimer:",
    },
};

export default function JoinCTA() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="py-20 bg-dravida-red text-white text-center">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">{t.heading}</h2>
                <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">{t.sub}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-dravida-red font-bold rounded-lg hover:bg-neutral-100 transition-colors text-lg">
                        {t.btn1}
                    </button>
                    <button className="px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors border border-red-700">
                        {t.btn2}
                    </button>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm font-medium text-red-200 opacity-80">
                    {t.future.map((f, i) => (
                        <>
                            <span key={i} className="flex items-center gap-2">{f}</span>
                            {i < t.future.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-red-400 hidden sm:block" />}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Disclaimer() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="bg-neutral-900 py-6 border-t border-neutral-800">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="bg-neutral-800/50 rounded-lg p-4 inline-block mx-auto border border-neutral-700/50">
                    <p className="text-neutral-500 text-xs md:text-sm">
                        <span className="text-dravida-red font-bold uppercase mr-2">{t.note}</span>
                        {t.disclaimer}
                    </p>
                </div>
            </div>
        </section>
    );
}
