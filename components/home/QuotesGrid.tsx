"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        heading1: "சிந்தனை",
        heading2: "வார்த்தைகள்",
        quotes: [
            { quote: "அநீதியைப் பார்த்து அமைதியாக இருப்பது,\nஅதற்கு ஒப்புதல் அளிப்பதற்குச் சமம்.", author: "திராவிட தலைமுறை" },
            { quote: "சட்டம் இருக்கிறது என்று சொல்லாதே,\nநீதி யாருக்குக் கிடைத்தது என்று சொல்.", author: "திராவிட தலைமுறை" },
            { quote: "அதிகாரம் உன்னை அமைதியாக இருக்கச் சொன்னால்,\nநீ பேச வேண்டிய நேரம் வந்துவிட்டது.", author: "திராவிட தலைமுறை" },
            { quote: "பத்திரிகை உண்மையை மறைத்தால்,\nஅது ஊடகம் அல்ல — உபகரணம்.", author: "திராவிட தலைமுறை" },
            { quote: "பெண் அடக்கப்பட்ட சமூகத்தில்,\nயாரும் சுதந்திரமானவர்கள் அல்ல.", author: "திராவிட தலைமுறை" },
            { quote: "மக்கள் கேள்வி கேட்காத நாளில் தான்,\nஅதிகாரம் நிம்மதியாக உறங்கும்.", author: "திராவிட தலைமுறை" },
        ],
        thoughtTitle1: "திராவிட தலைமுறை",
        thoughtTitle2: "சிந்தனை",
        thoughtQuotes: [
            "நாங்கள் நம்புவது —\nபக்தி அல்ல, பகுத்தறிவு.",
            "நாங்கள் எழுதுவது —\nஅதிகாரத்திற்கு வசதியாக அல்ல,\nமக்களுக்கு அவசியமாக.",
            "சிந்தனை என்பது ஆடம்பரம் அல்ல —\nஅது சுதந்திரத்தின் அடிப்படை.",
        ]
    },
    en: {
        heading1: "Words of",
        heading2: "Thought",
        quotes: [
            { quote: "Remaining silent in the face of injustice\nis equal to giving consent to it.", author: "Diravida Thalaimurai" },
            { quote: "Don’t tell me the law exists.\nTell me who justice actually reached.", author: "Diravida Thalaimurai" },
            { quote: "When power asks you to stay silent,\nthat is when you must speak.", author: "Diravida Thalaimurai" },
            { quote: "When journalism hides the truth,\nit is no longer media — it becomes a tool.", author: "Diravida Thalaimurai" },
            { quote: "In a society where women are oppressed,\nno one is truly free.", author: "Diravida Thalaimurai" },
            { quote: "Power sleeps peacefully\nonly on the day people stop questioning.", author: "Diravida Thalaimurai" },
        ],
        thoughtTitle1: "Diravida Thalaimurai",
        thoughtTitle2: "Thought",
        thoughtQuotes: [
            "What we believe in\nis not blind faith — but rational thinking.",
            "What we write\nis not for the comfort of power,\nbut for the necessity of the people.",
            "Thought is not a luxury —\nit is the foundation of freedom.",
        ]
    },
};

function QuoteCard({ quote, author }: { quote: string; author: string }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-dravida-red relative hover:-translate-y-1 transition-transform duration-300">
            <span className="text-6xl text-neutral-200 font-serif absolute top-4 left-4">"</span>
            <p className="text-lg text-neutral-800 font-bold italic relative z-10 mb-6 mt-4 whitespace-pre-line leading-relaxed">{quote}</p>
            <div className="flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-neutral-200" />
                <span className="text-sm font-bold text-dravida-red uppercase tracking-wider">{author}</span>
            </div>
        </div>
    );
}

export default function QuotesGrid() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="py-24 bg-neutral-50 px-4">
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold mb-16">
                    {t.heading1} <span className="text-dravida-red">{t.heading2}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.quotes.map((q, i) => (
                        <QuoteCard key={i} quote={q.quote} author={q.author} />
                    ))}
                </div>

                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-center text-3xl font-bold mb-12">
                        <span className="text-dravida-red">{t.thoughtTitle1}</span> {t.thoughtTitle2}
                    </h2>
                    <div className="bg-neutral-900 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/50" />
                        <div className="relative z-10 flex flex-col gap-10">
                            {t.thoughtQuotes.map((q, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-dravida-red text-4xl mb-2 font-serif">"</span>
                                    <p className="text-white text-xl md:text-2xl font-black italic whitespace-pre-line leading-relaxed">
                                        {q}
                                    </p>
                                    {i < t.thoughtQuotes.length - 1 && (
                                        <div className="w-16 h-px bg-neutral-700 mt-10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
