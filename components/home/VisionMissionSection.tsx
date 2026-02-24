"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Target } from "lucide-react";

const content = {
    tn: {
        visionTitle: "எங்கள் கனவு",
        visions: [
            "சாதி இல்லா சமூகம்",
            "பெண் சுயமரியாதையுடன் வாழும் சமூகம்",
            "மதச்சார்பற்ற மனிதநேய சமூகம்",
            "தமிழ் மொழி, இன அடையாளம் பாதுகாக்கப்படும் நாடு",
            "கேள்வி கேட்கத் தெரிந்த இளம் தலைமுறை",
        ],
        missionTitle: "எங்கள் பணி",
        missions: [
            "திராவிட சிந்தனைகளை எளிய தமிழில் பரப்புதல்",
            "இளைஞர்களிடையே விழிப்புணர்வு ஏற்படுத்துதல்",
            "சமூக அநீதிகளுக்கு எதிராக குரல் கொடுத்தல்",
            "எழுத்து, கலை, ஊடகம் மூலம் கருத்துகளை பகிர்தல்",
        ],
    },
    en: {
        visionTitle: "Our Vision",
        visions: [
            "A casteless society rooted in equality",
            "A society where women live with self-respect, dignity, and freedom",
            "A secular, human-centered society beyond religious divisions",
            "A nation where the Tamil language and Dravidian identity are protected and celebrated",
            "A questioning, thinking young generation that challenges injustice",
        ],
        missionTitle: "Our Mission",
        missions: [
            "To spread Dravidian thought in simple, accessible Tamil",
            "To create awareness among the youth and encourage critical thinking",
            "To raise our voice against social injustices in all forms",
            "To express and share ideas through writing, art, and media",
        ],
    }
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const stagger = { show: { transition: { staggerChildren: 0.15 } } };

export default function VisionMissionSection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <section className="bg-neutral-900 border-t-4 border-dravida-red text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e11d48 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-12 lg:gap-16"
                >
                    {/* Vision */}
                    <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 lg:p-10 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute -top-10 -right-10 text-amber-500/10 group-hover:text-amber-500/20 transition-colors duration-500">
                            <Sparkles className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-8">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-black mb-8 text-amber-400">{t.visionTitle}</h2>
                            <ul className="space-y-4">
                                {t.visions.map((v, i) => (
                                    <li key={i} className="flex items-start gap-4 text-neutral-200">
                                        <div className="w-1.5 h-1.5 bg-amber-500 mt-2.5 rounded-sm shrink-0" />
                                        <span className="text-lg leading-relaxed font-medium">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Mission */}
                    <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 lg:p-10 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute -bottom-10 -right-10 text-green-500/10 group-hover:text-green-500/20 transition-colors duration-500">
                            <Target className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-8">
                                <Target className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-black mb-8 text-green-400">{t.missionTitle}</h2>
                            <ul className="space-y-4">
                                {t.missions.map((m, i) => (
                                    <li key={i} className="flex items-start gap-4 text-neutral-200">
                                        <div className="w-1.5 h-1.5 bg-green-500 mt-2.5 rounded-sm shrink-0" />
                                        <span className="text-lg leading-relaxed font-medium">{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
