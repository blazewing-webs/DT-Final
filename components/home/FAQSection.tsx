"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            q: "திராவிட தலைமுறை அரசியல் கட்சியா?",
            a: "இல்லை. இது ஒரு சிந்தனை இயக்கம். சமூக நீதி மற்றும் பகுத்தறிவு கருத்துக்களை மக்களிடம் கொண்டு சேர்ப்பதே இதன் நோக்கம்."
        },
        {
            q: "யார் வேண்டுமானாலும் இணையலாமா?",
            a: "ஆம். சாதி, மதம், பாலினம், மொழி என எந்த வேற்றுமையும் இன்றி மனிதநேயம் கொண்ட யார் வேண்டுமானாலும் இணையலாம்."
        },
        {
            q: "இந்த தளம் யாருக்காக?",
            a: "மாணவர்கள், இளைஞர்கள் மற்றும் சமூக மாற்றத்தை விரும்பும் அனைத்து பொதுமக்களுக்கும் ஆனது."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-neutral-900 font-heading mb-12">
                    கேள்வி – பதில்கள்
                </h2>

                <div className="space-y-4">
                    {faqs.map((item, idx) => (
                        <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-5 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
                            >
                                <span className="font-bold text-neutral-900">{item.q}</span>
                                {openIndex === idx ? (
                                    <Minus className="h-5 w-5 text-dravida-red" />
                                ) : (
                                    <Plus className="h-5 w-5 text-neutral-400" />
                                )}
                            </button>
                            {openIndex === idx && (
                                <div className="p-5 bg-white border-t border-neutral-100 text-neutral-600 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
