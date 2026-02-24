"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Zap,
    Search,
    Target,
    Layers,
    Megaphone,
    Lightbulb,
    Scale,
    AlertTriangle,
    ArrowRight,
    ShieldCheck
} from "lucide-react";

const content = {
    tn: {
        pageSubtitle: "எங்கள் கொள்கை",
        introTitle: "திராவிட தலைமுறை",
        introSubtitle: "உண்மை பேசுவது எப்போதும் வசதியானது அல்ல. அதனால் தான் அது அவசியம்.",
        standTitle: "எங்கள் நிலைப்பாடு",
        standBody1: "திராவிட தலைமுறை நடுநிலையென்கிற முகமூடி அணியாது.",
        standBody2: "அநீதிக்கும் நீதிக்கும் நடுவில் நிற்பது நடுநிலை அல்ல — அது அநீதிக்கான ஆதரவு.",
        whatTitle: "இங்கே என்ன கிடைக்கும்?",
        whatItems: [
            "அதிகாரம் மறைக்க முயன்ற உண்மைகள்",
            "சமூகத்திற்கு அசௌகரியமான கேள்விகள்",
            "அழகுபடுத்தப்படாத செய்திகள்",
            "புறக்கணிக்கப்பட்ட குரல்கள்"
        ],
        whatConclusion: "TRP காக அல்ல — மக்களுக்காக.",
        truthTitle: "உண்மை முதலில்",
        truthIntro: "இந்த தளத்தில்:",
        truthItems: [
            { from: "வதந்தி", to: "செய்தி ஆகாது" },
            { from: "கருத்து", to: "உண்மை ஆகாது" },
            { from: "பயம்", to: "மௌனமாகாது" }
        ],
        truthConclusion: "Fact First. Always.",
        powerTitle: "அதிகார கண்காணிப்பு",
        powerBody1: "அதிகாரம் எப்போதும் உண்மையை விரும்புவதில்லை. அதனால், அதிகாரத்தை கேள்வி கேட்பது பத்திரிகையின் கடமை.",
        powerBody2: "திராவிட தலைமுறை அந்த கடமையிலிருந்து ஒருபோதும் விலகாது.",
        behindTitle: "செய்தியின் பின்னணி",
        behindBody1: "ஒரு headline போதாது. ஒரு viral video போதாது.",
        behindBody2: "செய்தியின் வரலாறு, அரசியல், சமூக தாக்கம் எல்லாம் சேர்த்தே முழு உண்மை உருவாகும்.",
        behindBody3: "அதைத்தான் நாங்கள் எழுதுகிறோம்.",
        voicesTitle: "பேசப்படாத குரல்கள்",
        voicesBody1: "இந்த தளம் பிரபலங்களுக்கான மேடை அல்ல.",
        voicesBody2: "குரல் மறுக்கப்பட்டவர்களுக்கானது. பெயர் தெரியாதவர்களுக்கானது. வலி அனுபவிப்பவர்களுக்கானது.",
        readingTitle: "வாசிப்பது ஏன் முக்கியம்?",
        readingBody1: "அரசியல் புரியாத சமூகம் எளிதில் ஏமாறும். சட்டம் தெரியாத மக்கள் உரிமை இழப்பார்கள்.",
        readingBody2: "அதனால் செய்தி மட்டும் அல்ல — விழிப்புணர்வு.",
        warningTitle: "எச்சரிக்கை வரி",
        warningBody1: "மௌனம் பாதுகாப்பு அல்ல.",
        warningBody2: "அது குற்றத்தில் பங்கேற்பு."
    },
    en: {
        pageSubtitle: "Our Policy",
        introTitle: "Diravida Thalaimurai",
        introSubtitle: "Speaking the truth is never comfortable. That is precisely why it is necessary.",
        standTitle: "Our Stand",
        standBody1: "Diravida Thalaimurai does not wear the mask of so-called neutrality.",
        standBody2: "Standing between justice and injustice is not neutrality — it is support for injustice.",
        whatTitle: "What You’ll Find Here",
        whatItems: [
            "Truths that power tries to hide",
            "Questions that make society uncomfortable",
            "News without cosmetic polish",
            "Marginalised and silenced voices"
        ],
        whatConclusion: "Not for TRP — but for the people.",
        truthTitle: "Truth Comes First",
        truthIntro: "On this platform:",
        truthItems: [
            { from: "Rumours", to: "do not become news" },
            { from: "Opinions", to: "do not become facts" },
            { from: "Fear", to: "does not become silence" }
        ],
        truthConclusion: "Fact First. Always.",
        powerTitle: "Holding Power Accountable",
        powerBody1: "Power does not naturally favour truth. That is why questioning power is journalism’s duty.",
        powerBody2: "Diravida Thalaimurai will never step away from that responsibility.",
        behindTitle: "Behind the News",
        behindBody1: "A headline is not enough. A viral video is not enough.",
        behindBody2: "Truth emerges only when history, politics, and social impact are examined together.",
        behindBody3: "That is what we write.",
        voicesTitle: "Unheard Voices",
        voicesBody1: "This platform is not a stage for the powerful.",
        voicesBody2: "It belongs to the voiceless. The unnamed. Those who live with pain.",
        readingTitle: "Why Reading Matters",
        readingBody1: "A society that does not understand politics is easily deceived. People who do not know the law lose their rights.",
        readingBody2: "That is why we offer not just news — but awareness.",
        warningTitle: "Warning Line",
        warningBody1: "Silence is not safety.",
        warningBody2: "It is participation in injustice."
    }
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const stagger = { show: { transition: { staggerChildren: 0.15 } } };

export default function PolicyContent() {
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <div id="policy" className="bg-neutral-50 relative overflow-hidden py-24 sm:py-32">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-neutral-200/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Section Tag */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-dravida-red font-bold text-xs uppercase tracking-[0.2em]">
                        <ShieldCheck className="w-4 h-4" />
                        {t.pageSubtitle}
                    </div>
                </div>

                {/* Hero / Intro Section */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="max-w-4xl mb-20 md:mb-28 text-center mx-auto"
                >
                    <h2 className="text-dravida-red font-black text-xl lg:text-2xl mb-8 flex items-center justify-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-dravida-red shadow-[0_0_15px_rgba(225,29,72,0.8)] animate-pulse" />
                        {t.introTitle}
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.25] tracking-tight text-balance">
                        {t.introSubtitle}
                    </h3>
                </motion.div>

                {/* Bento Grid 1: Stand & Truth */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8"
                >
                    {/* Our Stand */}
                    <motion.div variants={fadeUp} className="col-span-1 lg:col-span-7 bg-neutral-900 text-white rounded-[2rem] p-10 lg:p-14 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-white group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
                            <Zap className="w-40 h-40" />
                        </div>
                        <div className="relative z-10">
                            <Zap className="text-amber-400 w-10 h-10 mb-8" />
                            <h3 className="text-3xl lg:text-4xl font-black mb-8">{t.standTitle}</h3>
                            <p className="text-xl lg:text-2xl text-neutral-300 leading-relaxed font-medium mb-8">
                                {t.standBody1}
                            </p>
                            <div className="text-xl lg:text-2xl text-white leading-relaxed font-bold bg-white/10 p-6 lg:p-8 rounded-2xl border border-white/20 inline-block backdrop-blur-sm shadow-xl">
                                {t.standBody2}
                            </div>
                        </div>
                    </motion.div>

                    {/* Truth Comes First */}
                    <motion.div variants={fadeUp} className="col-span-1 lg:col-span-5 bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
                        <div>
                            <Search className="w-10 h-10 text-blue-500 mb-6" />
                            <h3 className="text-2xl lg:text-3xl font-black text-neutral-900 mb-4">{t.truthTitle}</h3>
                            <p className="text-neutral-500 italic mb-8 font-medium">{t.truthIntro}</p>
                            <div className="space-y-4 mb-8">
                                {t.truthItems.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-1.5 p-5 bg-neutral-50 border border-neutral-100 rounded-xl hover:bg-neutral-100 transition-colors">
                                        <span className="text-neutral-400 font-bold line-through decoration-red-400 decoration-2">{item.from}</span>
                                        <div className="flex items-center gap-3">
                                            <ArrowRight className="w-5 h-5 text-dravida-red shrink-0" />
                                            <span className="text-neutral-900 font-black text-lg">{item.to}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center font-black text-dravida-red bg-red-50 border border-red-100 py-4 rounded-xl text-sm lg:text-base tracking-[0.2em] shadow-sm">
                            {t.truthConclusion}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bento Grid 2: What, Behind, Voices */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8"
                >
                    {/* What you'll find */}
                    <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 lg:p-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                        <div>
                            <div className="w-14 h-14 bg-red-50 text-dravida-red rounded-2xl flex items-center justify-center mb-8">
                                <Target className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 mb-8">{t.whatTitle}</h3>
                            <ul className="space-y-5 mb-10">
                                {t.whatItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-700 font-medium">
                                        <div className="w-1.5 h-1.5 bg-dravida-red mt-2.5 rounded-sm shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-sm font-bold text-neutral-900 bg-neutral-100/80 p-5 rounded-xl flex items-center gap-3 border border-neutral-200">
                            <span className="text-lg">🔥</span> {t.whatConclusion}
                        </div>
                    </motion.div>

                    {/* Behind the News */}
                    <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 lg:p-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-500">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                            <Layers className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 mb-6">{t.behindTitle}</h3>
                        <div className="space-y-5 flex-1 flex flex-col">
                            <p className="text-neutral-500 font-bold border-l-2 border-neutral-200 pl-4 py-1">{t.behindBody1}</p>
                            <p className="text-neutral-800 font-semibold leading-relaxed text-lg">{t.behindBody2}</p>
                            <div className="mt-auto pt-6 w-full">
                                <p className="text-blue-600 font-black pt-4 border-t-2 border-blue-50 inline-block w-full">{t.behindBody3}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Unheard Voices */}
                    <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 lg:p-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-500">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                            <Megaphone className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 mb-6">{t.voicesTitle}</h3>
                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                            <p className="text-neutral-500 font-bold tracking-wide uppercase text-sm border-b border-neutral-100 pb-4">{t.voicesBody1}</p>
                            <p className="text-emerald-950 font-black leading-relaxed text-xl">{t.voicesBody2}</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bento Grid 3: Power & Reading */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-24"
                >
                    {/* Holding Power Accountable */}
                    <motion.div variants={fadeUp} className="bg-amber-50 rounded-[2rem] p-8 lg:p-12 border border-amber-100 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 text-amber-500 group-hover:scale-110 transition-transform duration-500">
                            <Scale className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <Scale className="w-12 h-12 text-amber-600 mb-8" />
                            <h3 className="text-3xl font-black text-neutral-900 mb-6">{t.powerTitle}</h3>
                            <p className="text-amber-900/80 font-medium leading-relaxed mb-8 text-xl">
                                {t.powerBody1}
                            </p>
                            <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-amber-100/50">
                                <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
                                <p className="font-black text-amber-950 text-lg leading-tight">{t.powerBody2}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Why Reading Matters */}
                    <motion.div variants={fadeUp} className="bg-indigo-50 rounded-[2rem] p-8 lg:p-12 border border-indigo-100 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 opacity-5 text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                            <Lightbulb className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <Lightbulb className="w-12 h-12 text-indigo-600 mb-8" />
                            <h3 className="text-3xl font-black text-neutral-900 mb-6">{t.readingTitle}</h3>
                            <p className="text-indigo-900/80 font-medium leading-relaxed mb-8 text-xl">
                                {t.readingBody1}
                            </p>
                            <div className="bg-indigo-600 text-white font-black text-xl lg:text-2xl p-6 lg:p-8 rounded-2xl shadow-lg border border-indigo-700/50 flex gap-4 items-center">
                                <span className="text-3xl shrink-0">👉</span>
                                {t.readingBody2}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Final Warning Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="bg-neutral-900 text-white p-10 lg:p-20 rounded-[3rem] relative overflow-hidden text-center shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-red-950" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <div className="bg-red-500/10 p-5 rounded-full mb-8 border border-red-500/20">
                            <AlertTriangle className="w-12 h-12 text-red-500" />
                        </div>
                        <p className="text-red-400 capitalize lg:uppercase tracking-[0.3em] font-extrabold text-sm mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-red-500/50" />
                            {t.warningTitle}
                            <span className="w-8 h-px bg-red-500/50" />
                        </p>
                        <h3 className="text-3xl lg:text-5xl font-black leading-tight mb-6 text-white text-balance drop-shadow-md">
                            {t.warningBody1}
                        </h3>
                        <div className="mt-4 pb-2 border-b-4 border-dravida-red inline-block">
                            <p className="text-2xl lg:text-4xl font-extrabold text-white/90">
                                {t.warningBody2}
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
