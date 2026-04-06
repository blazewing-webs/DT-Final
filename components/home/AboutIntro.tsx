"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const text = {
    tn: {
        badge: "பொறுப்புத் துறப்பு",
        title1: "திராவிடத்",
        title2: "தலைமுறை",
        p1: "திராவிடத் தலைமுறை என்பது சமூக நீதி, சமத்துவம், மற்றும் பகுத்தறிவு சிந்தனைகளை முன்னெடுக்கும் ஓர் இளைஞர் இயக்கம். எங்கள் நோக்கம், தந்தை பெரியார், பேரறிஞர் அண்ணா, முத்தமிழறிஞர் கலைஞர் ஆகியோரின் கொள்கைகளை இன்றைய நவீன உலகிற்கு ஏற்ப கொண்டு செல்வதே ஆகும்.",
        p2: "சாதி, மத, பாலின வேறுபாடுகளற்ற ஒரு சமத்துவ சமுதாயத்தை உருவாக்குவதே எங்கள் இலக்கு. அறிவியல் பார்வையும், மனிதநேயமும் கொண்ட புதிய தலைமுறையை வார்ப்பதே எங்கள் கனவு.",
        imgCaption: "சமூக நீதி காவலர்கள்",
        imgSub: "Social Justice Warriors",
    },
    en: {
        badge: "Disclaimer",
        title1: "Diravida",
        title2: "Thalaimurai",
        p1: "Diravida Thalaimurai is a youth movement that champions social justice, equality, and rationalist thought. Our aim is to carry forward the principles of Thanthai Periyar, Perarignar Anna, and Muthamizharignar Kalaignar and apply them to the modern world.",
        p2: "Our goal is to build an equal society free from caste, religious, and gender divisions. Our dream is to shape a new generation equipped with scientific thinking and genuine humanity.",
        imgCaption: "Social Justice Warriors",
        imgSub: "சமூக நீதி காவலர்கள்",
    },
};

export default function AboutIntro() {
    const { isTamil } = useLanguage();
    const t = isTamil ? text.tn : text.en;

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50 -skew-x-12 translate-x-32 z-0" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-dravida-red font-bold text-sm uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-dravida-red animate-pulse" />
                            {t.badge}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
                            {t.title1} <span className="text-dravida-red">{t.title2}</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed font-medium">{t.p1}</p>
                        <p className="text-lg text-neutral-600 leading-relaxed">{t.p2}</p>
                    </div>
                    <div className="flex-1 relative">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-neutral-500">
                                <img
                                    src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000"
                                    alt="Community"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="font-bold text-xl">{t.imgCaption}</p>
                                    <p className="text-sm opacity-80">{t.imgSub}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-dravida-red/10 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
