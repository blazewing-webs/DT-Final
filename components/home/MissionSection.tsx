"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        heading1: "எங்கள்",
        heading2: "பணி",
        body: "நாங்கள் வெறும் பார்வையாளர்கள் அல்ல, களப்பணியாளர்கள். சமூகத்தில் மாற்றத்தை விதைக்க, ஒவ்வொரு நாளும் நாங்கள் உழைக்கிறோம்.",
        activities: ["கருத்தரங்குகள் நடத்துதல்", "சமூக வலைதள விழிப்புணர்வு", "பள்ளி, கல்லூரி மாணவர்களுடன் கலந்துரையாடல்"],
        cards: [
            { title: "மூடநம்பிக்கை ஒழிப்பு", desc: "மக்களிடம் அறிவியல் மனப்பான்மையை வளர்த்தல்." },
            { title: "இளைஞர் விழிப்புணர்வு", desc: "அரசியல் மற்றும் சமூக தெளிவு ஏற்படுத்துதல்." },
            { title: "சமூக அநீதி எதிர்ப்பு", desc: "எங்கு அநீதி நடந்தாலும் தட்டித் கேட்டல்." },
            { title: "ஜனநாயக பாதுகாப்பு", desc: "ஜனநாயக மாண்புகளை காத்தல் மற்றும் போற்றுதல்." },
        ],
    },
    en: {
        heading1: "Our",
        heading2: "Mission",
        body: "We are not mere bystanders — we are active field workers. Every day, we strive to sow seeds of change within society.",
        activities: ["Conducting forums and seminars", "Social media awareness campaigns", "Engaging with school and college students"],
        cards: [
            { title: "Eradicating Superstition", desc: "Cultivating a scientific mindset among the people." },
            { title: "Youth Awareness", desc: "Building political and social clarity among youth." },
            { title: "Opposing Social Injustice", desc: "Speaking up wherever injustice occurs." },
            { title: "Protecting Democracy", desc: "Upholding and celebrating democratic values." },
        ],
    },
};

export default function MissionSection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section className="py-24 bg-neutral-50" id="mission">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {t.cards.map((mission, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-dravida-red font-bold mb-4">
                                    {idx + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-neutral-900">{mission.title}</h3>
                                <p className="text-sm text-neutral-600">{mission.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 order-1 lg:order-2 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900">
                            {t.heading1} <span className="text-dravida-red">{t.heading2}</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">{t.body}</p>
                        <ul className="space-y-4">
                            {t.activities.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-neutral-700 font-medium">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
