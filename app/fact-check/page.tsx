"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle, AlertTriangle, XCircle, Loader2, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

interface FactCheckItem {
    id: string;
    claim: string;
    verdict: "True" | "False" | "Misleading";
    explanation: string;
    imageUrl: string;
    createdAt: any;
}

const content = {
    tn: {
        pageTitle: "🔍 உண்மைச் சோதனை",
        tagline: "உண்மை • ஆதாரம் • பொறுப்பு",
        intro: "செய்தி வேகமாக பரவுகிறது. ஆனால் உண்மை அதைவிட மெதுவாகவும், ஆழமாகவும் இருக்கும். சமூக ஊடகங்களில் பரவும் தகவல்கள், வதந்திகள், தவறான செய்திகள் உண்மையா? பொய்யா? என்பதை ஆதாரங்களுடன் சரிபார்த்து வழங்கும் பகுதி.",
        motto: '"சிந்திக்காமல் பகிராதீர்கள்."',
        howTitle: "🧠 Fact Check எப்படி செய்கிறோம்?",
        hows: ["அரசு தரவுகள்", "நீதிமன்ற தீர்ப்புகள்", "நம்பகமான ஆய்வுகள்", "அதிகாரப்பூர்வ அறிவிப்புகள்", "பல்வேறு ஊடக ஒப்பீடுகள்"],
        howNote: "👉 ஒரே ஆதாரம் போதுமானதல்ல.",
        verdictsTitle: "📌 Fact Check முடிவுகள் – வகைகள்",
        readerCall: "📢 வாசகர்களுக்கு வேண்டுகோள்: உங்களுக்குச் சந்தேகமான தகவல் கிடைத்தால், Fact Check செய்ய அனுப்புங்கள்.",
        perspective: "உண்மை என்பது எந்த பக்கத்துக்கும் சொந்தமானது அல்ல. அது மக்களுக்குச் சொந்தமானது.",
        articlesTitle: "✅ சமீபத்திய Fact Check-கள்",
        claimLabel: "கூற்று:",
        factLabel: "உண்மை / சூழல்:",
        empty: "Fact Check பதிவுகள் விரைவில்...",
    },
    en: {
        pageTitle: "🔍 Fact Check",
        tagline: "Truth • Evidence • Responsibility",
        intro: "News spreads fast. But truth moves slower — and deeper. This section verifies information, rumours, and claims circulating on social media and presents what is true and what is false — with evidence.",
        motto: '"Don\'t share without thinking."',
        howTitle: "🧠 How We Do Fact Checks",
        hows: ["Government data", "Court judgments", "Credible research studies", "Official announcements", "Cross-verification across multiple media sources"],
        howNote: "👉 One source is never enough.",
        verdictsTitle: "📌 Fact Check Verdicts",
        readerCall: "📢 A Request to Readers: If you come across any information that seems doubtful, send it to us for fact-checking.",
        perspective: "Truth does not belong to any side. It belongs to the people.",
        articlesTitle: "✅ Recent Fact Checks",
        claimLabel: "Claim:",
        factLabel: "Fact / Context:",
        empty: "Fact checks coming soon...",
    },
};

const verdictConfig = {
    False: { label: { tn: "❌ பொய்", en: "❌ False" }, cls: "bg-red-100 text-red-700", icon: XCircle },
    Misleading: { label: { tn: "⚠️ தவறாக வழிநடத்தும்", en: "⚠️ Misleading" }, cls: "bg-yellow-100 text-yellow-700", icon: AlertTriangle },
    True: { label: { tn: "✅ உண்மை", en: "✅ True" }, cls: "bg-green-100 text-green-700", icon: CheckCircle },
};

export default function FactCheckPage() {
    const [items, setItems] = useState<FactCheckItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, "fact_checks"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FactCheckItem[];
                setItems(data);
            } catch (error) {
                console.error("Error fetching fact checks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            {/* Editorial Intro */}
            <div className="pt-28 pb-0 bg-neutral-900 text-white">
                <div className="container mx-auto px-6 max-w-5xl py-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 font-bold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {t.tagline}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">{t.pageTitle}</h1>
                    <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-4">{t.intro}</p>
                    <p className="text-green-400 font-bold italic mb-8">{t.motto}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <p className="font-bold text-white mb-3">{t.howTitle}</p>
                            <ul className="space-y-2">
                                {t.hows.map((h, i) => (
                                    <li key={i} className="text-neutral-300 text-sm flex items-center gap-2">
                                        <span className="text-green-400">•</span> {h}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-amber-400 text-sm mt-3 font-bold">{t.howNote}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <p className="font-bold text-white mb-3">{t.verdictsTitle}</p>
                            <div className="space-y-2">
                                {(["True", "Misleading", "False"] as const).map(v => {
                                    const cfg = verdictConfig[v];
                                    return (
                                        <div key={v} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${cfg.cls}`}>
                                            {isTamil ? cfg.label.tn : cfg.label.en}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-green-700 py-4">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <p className="text-white font-bold text-sm">🧠 {t.perspective}</p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-12 max-w-4xl">
                <h2 className="text-xl font-black text-neutral-800 mb-6">{t.articlesTitle}</h2>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <CheckCircle className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <p className="text-neutral-500 font-bold">{t.empty}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {items.map((item) => {
                            const cfg = verdictConfig[item.verdict] || verdictConfig.Misleading;
                            const Icon = cfg.icon;
                            return (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${cfg.cls}`}>
                                                <Icon className="w-4 h-4" />
                                                {isTamil ? cfg.label.tn : cfg.label.en}
                                            </div>
                                            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                                <span className="text-neutral-500 font-medium text-base block mb-1">{t.claimLabel}</span>
                                                {item.claim}
                                            </h3>
                                            <div className="bg-neutral-50 p-4 rounded-lg border-l-4 border-neutral-300">
                                                <p className="font-bold text-neutral-700 mb-1">{t.factLabel}</p>
                                                <p className="text-neutral-600 leading-relaxed">{item.explanation}</p>
                                            </div>
                                        </div>
                                        {item.imageUrl && (
                                            <div className="w-full md:w-64 h-48 md:h-auto bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                                                <img src={item.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-8 bg-neutral-800 text-white rounded-xl p-5">
                    <p className="text-sm text-neutral-300">{t.readerCall}</p>
                </div>
            </section>
            <Footer />
        </main>
    );
}
