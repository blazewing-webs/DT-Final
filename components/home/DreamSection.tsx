"use client";

import { Target, Shield, Globe, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        heading1: "எங்கள்",
        heading2: "கனவு",
        sub: "எதிர்காலத் தமிழகம் எப்படி இருக்க வேண்டும் என்ற எங்கள் தொலைநோக்கு பார்வை.",
        items: [
            { title: "சமத்துவ சமுதாயம்", desc: "சாதி, மத பேதமற்ற சம உரிமை கொண்ட சமூகம்." },
            { title: "பெண் விடுதலை", desc: "பெண்களுக்கு சம உரிமை, கல்வி மற்றும் பாதுகாப்பு." },
            { title: "மாநில சுயாட்சி", desc: "மாநில உரிமைகள் மற்றும் அதிகார பரவல்." },
            { title: "அனைவருக்கும் கல்வி", desc: "தரமான, இலவச மற்றும் அறிவியல் பூர்வமான கல்வி." },
        ],
    },
    en: {
        heading1: "Our",
        heading2: "Vision",
        sub: "Our long-term vision for what Tamil society must become.",
        items: [
            { title: "Equal Society", desc: "A society with equal rights, free from caste and religious divisions." },
            { title: "Women's Liberation", desc: "Equal rights, education, and safety for women." },
            { title: "State Autonomy", desc: "State rights and devolution of power." },
            { title: "Education for All", desc: "Quality, free, and science-based education for everyone." },
        ],
    },
};

const icons = [
    <Target className="w-8 h-8" />,
    <Shield className="w-8 h-8" />,
    <Globe className="w-8 h-8" />,
    <BookOpen className="w-8 h-8" />,
];

export default function DreamSection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e11d48 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        {t.heading1} <span className="text-dravida-red">{t.heading2}</span>
                    </h2>
                    <p className="text-neutral-400 text-lg">{t.sub}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.items.map((item, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-dravida-red hover:border-dravida-red transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-xl bg-neutral-700/50 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors text-white">
                                {icons[index]}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-neutral-400 group-hover:text-white/90 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
