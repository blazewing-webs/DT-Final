"use client";

import { motion } from "framer-motion";
import { Shield, Target, Pen, BookOpen, Users, Mic } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JoinCTA from "@/components/home/JoinCTA";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
    tn: {
        pageTitle: "எங்கள் கொள்கை",
        pageSubtitle: "About Us",
        whatTitle: "திராவிட தலைமுறை என்றால் என்ன?",
        whatBody: "திராவிட தலைமுறை ஒரு கட்சி சார்பு ஊடகம் அல்ல. இது திராவிட சிந்தனையில் நின்று செயல்படும் சுதந்திர செய்தி தளம்.",
        styleTitle: "எங்கள் பத்திரிகை நடை",
        styleIntro: "திராவிட தலைமுறை நம்புவது —",
        news: "செய்தி",
        newsDesc: "வேகம் மட்டும் அல்ல — பொறுப்பு.",
        opinion: "கருத்து",
        opinionDesc: "உண்மையை மறைக்கும் ஆயுதம் அல்ல — அது உண்மையை விளக்கும் கருவி.",
        journalism: "பத்திரிகை",
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
        editorialTitle: "ஆசிரியர் கருத்து",
        editorialBody: "செய்தி என்பது தகவல் மட்டும் அல்ல. அது யாருக்காக, எதற்காக என்பதுதான் முக்கியம். திராவிட தலைமுறை, அதிகாரத்தின் குரலாக அல்ல; மக்களின் குரலாக செய்தியை வழங்கும்.",
        editorialPolicyTitle: "எங்கள் ஆசிரியர் கொள்கை:",
        editorialPolicies: [
            "உண்மை சரிபார்க்கப்பட்ட செய்திகளே வெளியிடப்படும்",
            "வெறுப்பு, வன்முறை, பாகுபாடு ஊக்குவிக்கும் செய்திகள் தவிர்க்கப்படும்",
            "திருத்தம் தேவைப்பட்டால் உடனடியாக செய்தி புதுப்பிக்கப்படும்",
            "கருத்து & செய்தி இரண்டும் தெளிவாக பிரிக்கப்பட்டு வழங்கப்படும்",
        ],
        ethicsPolicyTitle: "நெறிமுறைகள்",
        ethicsPolicies: [
            "மனித மரியாதை முதன்மை",
            "பெண்கள், குழந்தைகள், சிறுபான்மையினர் பாதுகாப்பு",
            "புகைப்படங்கள் தவறாக பயன்படுத்தப்படமாட்டாது",
            "தவறான தகவல் அறிந்ததும் நீக்கப்படும்",
        ],
        disclaimerTitle: "பொறுப்புத் துறப்பு",
        disclaimer: "இந்த இணையதளத்தில் வெளியிடப்படும் கருத்துகள், அந்த எழுத்தாளரின் தனிப்பட்ட கருத்தாக இருக்கலாம். திராவிட தலைமுறை எந்த சட்டப்பொறுப்பையும் ஏற்காது.",
    },
    en: {
        pageTitle: "Our Policy",
        pageSubtitle: "எங்கள் கொள்கை",
        whatTitle: "What is Diravida Thalaimurai?",
        whatBody: "Diravida Thalaimurai is not a party-affiliated media platform. It is an independent news and media space that operates firmly grounded in Dravidian thought and social justice values.",
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
        editorialTitle: "Editorial Note",
        editorialBody: "News is not just information. What truly matters is for whom it is told and why it is told. Diravida Thalaimurai does not speak as the voice of power; it delivers news as the voice of the people.",
        editorialPolicyTitle: "Our Editorial Policy:",
        editorialPolicies: [
            "Only verified and fact-checked news will be published",
            "Content that promotes hatred, violence, or discrimination will be avoided",
            "If corrections are required, updates will be made immediately",
            "Opinion and news will be clearly separated and presented transparently",
        ],
        ethicsPolicyTitle: "Ethics Policy",
        ethicsPolicies: [
            "Human dignity is paramount in all our reporting and content",
            "Women, children, and minority communities will be reported on with care, respect, and responsibility",
            "Images and photographs will not be misused, manipulated, or published unethically",
            "Any misinformation identified will be corrected or removed immediately",
        ],
        disclaimerTitle: "Disclaimer",
        disclaimer: "The views and opinions expressed on this website are solely those of the respective authors. Diravida Thalaimurai does not accept any legal responsibility for such individual opinions or expressions.",
    },
};

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function AboutPage() {
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <main className="min-h-screen font-sans bg-white">
            <Navbar />

            {/* Page Header */}
            <header className="pt-32 pb-14 bg-neutral-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e11d48 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative z-10">
                    <span className="text-dravida-red text-xs font-bold uppercase tracking-[0.3em]">{t.pageSubtitle}</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2">
                        {t.pageTitle.split(" ").map((w, i) => i === (isTamil ? 1 : 1) ? <span key={i} className="text-dravida-red"> {w}</span> : ` ${w}`)}
                    </h1>
                </div>
            </header>

            {/* What is DT */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="flex flex-col lg:flex-row gap-14 items-start">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-dravida-red font-bold text-sm uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-dravida-red animate-pulse" />
                                {t.pageTitle}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-neutral-900">{t.whatTitle}</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">{t.whatBody}</p>
                        </div>
                        {/* Decorative quote */}
                        <div className="flex-1 bg-neutral-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                            <span className="text-8xl text-white/5 font-serif absolute -top-4 -left-2">"</span>
                            <h3 className="text-xl font-bold mb-4 text-amber-400">{t.styleTitle}</h3>
                            <p className="text-neutral-400 mb-6 italic">{t.styleIntro}</p>
                            {[
                                { label: t.news, desc: t.newsDesc },
                                { label: t.opinion, desc: t.opinionDesc },
                                { label: t.journalism, desc: t.journalismDesc },
                            ].map((item, i) => (
                                <div key={i} className="mb-4 pl-3 border-l-2 border-dravida-red">
                                    <span className="font-black text-white">{item.label}</span>
                                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why We + Ethics */}
            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-dravida-red rounded-full flex items-center justify-center text-white text-sm">🔍</span>
                            {t.whyTitle}
                        </h2>
                        <ul className="space-y-4">
                            {[t.why1, t.why2, t.why3].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-neutral-700">
                                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-2xl font-black text-neutral-900 mb-2 flex items-center gap-3">
                            <span className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-white text-sm">🛡️</span>
                            {t.ethicsTitle}
                        </h2>
                        <p className="text-neutral-500 mb-4 italic">{t.ethicsIntro}</p>
                        <ul className="space-y-3 mb-6">
                            {[t.ethics1, t.ethics2, t.ethics3].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-neutral-700 font-medium">
                                    <span className="text-red-500">✗</span> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <p className="text-amber-900 font-bold text-sm">👉 {t.ethicsEnd}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e11d48 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10 grid md:grid-cols-2 gap-12">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-2xl font-black mb-6 text-amber-400">🟨 {t.visionTitle}</h2>
                        <ul className="space-y-3">
                            {t.visions.map((v, i) => (
                                <li key={i} className="flex items-start gap-3 text-neutral-300">
                                    <span className="text-amber-400 mt-0.5">•</span> {v}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-2xl font-black mb-6 text-green-400">🟩 {t.missionTitle}</h2>
                        <ul className="space-y-3">
                            {t.missions.map((m, i) => (
                                <li key={i} className="flex items-start gap-3 text-neutral-300">
                                    <span className="text-green-400 mt-0.5">•</span> {m}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Commitment */}
            <section className="py-20 bg-dravida-red text-white text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-3xl font-black mb-6">✊ {t.commitTitle}</h2>
                        <p className="text-white/90 text-lg leading-relaxed mb-4">{t.commit1}</p>
                        <p className="text-white/90 text-lg leading-relaxed mb-4">{t.commit2}</p>
                        <p className="text-white/80 text-base italic">{t.commit3}</p>
                        <div className="mt-8 pt-8 border-t border-white/20">
                            <p className="text-xl font-bold">🔚 {t.conclusionTitle}</p>
                            <p className="text-white/90 mt-2">{t.conclusion}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Editorial + Ethics + Disclaimer */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: t.editorialTitle,
                            body: t.editorialBody,
                            listTitle: t.editorialPolicyTitle,
                            list: t.editorialPolicies,
                            accent: "border-dravida-red",
                            icon: "✍️",
                        },
                        {
                            title: t.ethicsPolicyTitle,
                            body: "",
                            listTitle: "",
                            list: t.ethicsPolicies,
                            accent: "border-amber-500",
                            icon: "🛡️",
                        },
                        {
                            title: t.disclaimerTitle,
                            body: t.disclaimer,
                            listTitle: "",
                            list: [],
                            accent: "border-neutral-400",
                            icon: "📋",
                        },
                    ].map((card, i) => (
                        <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                            className={`bg-neutral-50 rounded-2xl p-6 border-t-4 ${card.accent}`}>
                            <p className="text-3xl mb-3">{card.icon}</p>
                            <h3 className="text-lg font-black text-neutral-900 mb-3">{card.title}</h3>
                            {card.body && <p className="text-neutral-600 text-sm leading-relaxed mb-4">{card.body}</p>}
                            {card.listTitle && <p className="font-bold text-neutral-800 text-sm mb-2">{card.listTitle}</p>}
                            {card.list.length > 0 && (
                                <ul className="space-y-2">
                                    {card.list.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                                            <span className="text-dravida-red mt-0.5">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            <JoinCTA />
            <Footer />
        </main>
    );
}
