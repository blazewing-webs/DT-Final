"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Newspaper,
    Scale,
    ShieldCheck,
    Search,
    PenTool,
    MessageSquare,
    Eye,
    AlertCircle,
    CheckCircle2,
    X,
    Users
} from "lucide-react";

const content = {
    tn: {
        sectionTag: "எங்களை பற்றி",
        whatTitle: "திராவிட தலைமுறை என்றால் என்ன?",
        whatBody1: "திராவிட தலைமுறை ஒரு கட்சி சார்பு ஊடகம் அல்ல.",
        whatBody2: "இது திராவிட சிந்தனையில் நின்று செயல்படும் சுதந்திர செய்தி தளம்.",
        styleTitle: "எங்கள் பத்திரிகை நடை",
        styleIntro: "திராவிட தலைமுறை நம்புவது —",
        news: "செய்தி என்பது",
        newsDesc: "வேகம் மட்டும் அல்ல — பொறுப்பு.",
        opinion: "கருத்து என்பது",
        opinionDesc: "உண்மையை மறைக்கும் ஆயுதம் அல்ல — அது உண்மையை விளக்கும் கருவி.",
        journalism: "பத்திரிகை என்பது",
        journalismDesc: "அதிகாரத்தின் நண்பன் அல்ல — மக்களின் குரல்.",
        whyTitle: "அதனால் நாங்கள்…",
        why1: "செய்திகளை அவசரமாக அல்ல, ஆராய்ந்து வழங்குகிறோம்.",
        why2: "அரசியல், சமூக கூற்றுகளை நம்பிக்கையில்லாமல் அல்ல, Fact Check செய்து வெளியிடுகிறோம்.",
        why3: "அதிகாரம் பேசும் குரல்களை விட பாதிக்கப்பட்ட, புறக்கணிக்கப்பட்ட குரல்களை முன்னிலைப்படுத்துகிறோம்.",
        ethicsTitle: "எங்கள் பத்திரிகை ஒழுக்கம்",
        ethicsIntro: "நாங்கள் —",
        ethics1: "ஊகங்களை செய்தியாக மாற்றுவதில்லை",
        ethics2: "வதந்திகளை பரப்புவதில்லை",
        ethics3: "கருத்தை செய்தியாக கலப்பதில்லை",
        ethicsEnd: "உண்மை, ஆதாரம், பொறுப்பு — இதுவே எங்கள் எழுத்தின் அடித்தளம்.",
        commitTitle: "எங்கள் உறுதி",
        commit1: "திராவிட தலைமுறை அதிகாரத்திற்கு வசதியாக எழுதாது.",
        commit2: "அநீதிக்கு மௌனமாக இருக்காது.",
        commit3: "உண்மை பேசுவதில் ஆபத்து இருந்தாலும், பொய் பேசுவதில் பாதுகாப்பு தேட மாட்டோம்.",
        conclusionTitle: "இறுதியாக",
        conclusion: "எங்கள் பத்திரிகை நடை ஒரு பாணி அல்ல. அது — சமத்துவத்திற்கான நிலைப்பாடு.",
    },
    en: {
        sectionTag: "About Us",
        whatTitle: "What is Diravida Thalaimurai?",
        whatBody1: "Diravida Thalaimurai is not a party-affiliated media platform.",
        whatBody2: "It is an independent news and media space that operates firmly grounded in Dravidian thought and social justice values.",
        styleTitle: "Our Journalistic Approach",
        styleIntro: "Diravida Thalaimurai believes—",
        news: "News",
        newsDesc: "is not just about speed — it is about responsibility.",
        opinion: "Opinion",
        opinionDesc: "is not a weapon to hide the truth — it is a tool to explain and illuminate the truth.",
        journalism: "Journalism",
        journalismDesc: "is not a companion of power — it is the voice of the people.",
        whyTitle: "That is why we…",
        why1: "Deliver news after research, not in haste.",
        why2: "Publish political and social claims only after fact-checking, not blind belief.",
        why3: "Give priority not to the voices of power, but to the voices of the oppressed, marginalized, and silenced.",
        ethicsTitle: "Our Journalistic Ethics",
        ethicsIntro: "We do not—",
        ethics1: "Turn assumptions into news",
        ethics2: "Spread rumors",
        ethics3: "Mix opinion with reporting",
        ethicsEnd: "Truth, evidence, and accountability form the foundation of our writing.",
        commitTitle: "Our Commitment",
        commit1: "Diravida Thalaimurai will not write to please power.",
        commit2: "It will not remain silent in the face of injustice.",
        commit3: "Even when speaking the truth carries risk, we will never seek safety in falsehood.",
        conclusionTitle: "In Conclusion",
        conclusion: "Our journalistic approach is not merely a style. It is a stand for equality.",
    },
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const stagger = { show: { transition: { staggerChildren: 0.15 } } };

export default function AboutUsSection() {
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <div id="about" className="bg-white relative overflow-hidden py-24 sm:py-32">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Section Tag */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 shadow-sm text-dravida-red font-bold text-xs uppercase tracking-[0.2em]">
                        <Users className="w-4 h-4" />
                        {t.sectionTag}
                    </div>
                </div>

                {/* Core Philosophy Bento Grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8"
                >
                    {/* What is DT Card */}
                    <motion.div variants={fadeUp} className="col-span-1 lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-white group-hover:scale-110 transition-transform duration-700">
                            <Newspaper className="w-32 h-32" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white mb-8 relative z-10">{t.whatTitle}</h3>
                        <p className="text-xl lg:text-2xl text-neutral-300 leading-relaxed font-medium relative z-10 mb-6">
                            {t.whatBody1}
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 inline-block relative z-10">
                            <p className="text-xl font-bold text-white leading-relaxed">
                                {t.whatBody2}
                            </p>
                        </div>
                    </motion.div>

                    {/* Journalistic Approach Card */}
                    <motion.div variants={fadeUp} className="col-span-1 lg:col-span-5 bg-blue-50 border border-blue-100 rounded-[2rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <h4 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                                <PenTool className="text-blue-600 w-6 h-6" />
                                {t.styleTitle}
                            </h4>
                            <p className="text-blue-600 font-bold mb-6 italic">{t.styleIntro}</p>
                            <div className="space-y-6">
                                {[
                                    { label: t.news, desc: t.newsDesc, icon: <Newspaper className="w-4 h-4" /> },
                                    { label: t.opinion, desc: t.opinionDesc, icon: <MessageSquare className="w-4 h-4" /> },
                                    { label: t.journalism, desc: t.journalismDesc, icon: <Eye className="w-4 h-4" /> },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start group/item">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:scale-110 transition-all">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-neutral-900 tracking-wide mb-1 flex items-center gap-2">
                                                {item.label}
                                            </div>
                                            <div className="text-neutral-600 text-sm leading-relaxed">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Ethics and Actions Section */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8"
                >
                    {/* Why We */}
                    <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between">
                        <div>
                            <div className="w-14 h-14 bg-red-50 text-dravida-red rounded-2xl flex items-center justify-center mb-8">
                                <Search className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 mb-8">{t.whyTitle}</h3>
                            <div className="space-y-5">
                                {[t.why1, t.why2, t.why3].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100">
                                        <CheckCircle2 className="w-5 h-5 text-dravida-red shrink-0 mt-0.5" />
                                        <span className="text-neutral-700 font-medium leading-relaxed font-sans">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Ethics */}
                    <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between">
                        <div>
                            <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mb-8">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 mb-8">{t.ethicsTitle}</h3>
                            <p className="text-neutral-500 mb-6 italic border-l-2 border-neutral-200 pl-4 font-medium">{t.ethicsIntro}</p>
                            <ul className="space-y-4 mb-8">
                                {[t.ethics1, t.ethics2, t.ethics3].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-neutral-800 font-bold bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                                        <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 shrink-0">
                                            <X className="w-3.5 h-3.5" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
                            <p className="text-blue-900 font-bold text-sm leading-relaxed relative z-10 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                                {t.ethicsEnd}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Final Commitment Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="bg-dravida-red text-white rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl"
                >
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                            <Scale className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black mb-10 tracking-wide text-white drop-shadow-sm">{t.commitTitle}</h3>
                        <div className="space-y-6 mb-12 w-full">
                            <p className="text-white text-xl lg:text-2xl font-medium leading-relaxed drop-shadow-sm">{t.commit1}</p>
                            <div className="h-px w-24 bg-white/20 mx-auto" />
                            <p className="text-white text-xl lg:text-2xl font-medium leading-relaxed drop-shadow-sm">{t.commit2}</p>
                            <div className="h-px w-24 bg-white/20 mx-auto" />
                            <p className="text-white/90 text-lg lg:text-xl font-bold bg-black/20 inline-block px-6 py-3 rounded-full drop-shadow-sm">{t.commit3}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 inline-block max-w-2xl border border-white/20">
                            <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 mb-3">{t.conclusionTitle}</p>
                            <p className="text-white text-2xl lg:text-3xl font-black leading-tight">{t.conclusion}</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
