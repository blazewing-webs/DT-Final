"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        heading1: "எங்கள்",
        heading2: "கொள்கைகள்",
        items: [
            { title: "சுயமரியாதை", en: "Self-Respect", color: "bg-red-50 text-red-600 border-red-100" },
            { title: "பகுத்தறிவு", en: "Rationalism", color: "bg-blue-50 text-blue-600 border-blue-100" },
            { title: "சமூக நீதி", en: "Social Justice", color: "bg-green-50 text-green-600 border-green-100" },
            { title: "மொழி உரிமை", en: "Language Rights", color: "bg-orange-50 text-orange-600 border-orange-100" },
            { title: "சமத்துவம்", en: "Equality", color: "bg-purple-50 text-purple-600 border-purple-100" },
        ],
    },
    en: {
        heading1: "Our",
        heading2: "Principles",
        items: [
            { title: "Self-Respect", en: "சுயமரியாதை", color: "bg-red-50 text-red-600 border-red-100" },
            { title: "Rationalism", en: "பகுத்தறிவு", color: "bg-blue-50 text-blue-600 border-blue-100" },
            { title: "Social Justice", en: "சமூக நீதி", color: "bg-green-50 text-green-600 border-green-100" },
            { title: "Language Rights", en: "மொழி உரிமை", color: "bg-orange-50 text-orange-600 border-orange-100" },
            { title: "Equality", en: "சமத்துவம்", color: "bg-purple-50 text-purple-600 border-purple-100" },
        ],
    },
};

export default function IdeologySection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="py-24 bg-white" id="ideology">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
                    {t.heading1} <span className="text-dravida-red">{t.heading2}</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {t.items.map((item, idx) => (
                        <div key={idx} className={`p-6 md:p-8 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-default ${item.color}`}>
                            <div className="text-3xl mb-2 font-black opacity-20">{idx + 1}</div>
                            <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                            <p className="text-xs uppercase tracking-wider opacity-80 font-semibold">{item.en}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
