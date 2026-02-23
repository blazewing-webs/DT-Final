"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

interface YouthDeskItem {
    id: string;
    title: string;
    description: string;
    link: string;
    createdAt: any;
}

const content = {
    tn: {
        pageTitle: "இளைஞர் மேசை",
        tagline: "கேள்விகள் • கனவுகள் • குரல்கள்",
        intro: "இளைஞர்கள் வெறும் எதிர்காலம் அல்ல — அவர்கள் இன்றைய அரசியல், சமூக மாற்றத்தின் மையம். மாணவர்கள், இளம் தொழிலாளர்கள், வேலை தேடும் இளைஞர்கள் சந்திக்கும் பிரச்சினைகள், கனவுகள், போராட்டங்களை இந்தப் பகுதியில் பேசுகிறது.",
        perspective: "இளைஞர்கள் கேள்வி கேட்கும்போது தான் ஜனநாயகம் உயிருடன் இருக்கும்.",
        coversTitle: "Youth Desk கவனம்",
        covers: ["வேலைவாய்ப்பு", "கல்வி & தேர்வுகள்", "மாணவர் அரசியல்", "மனநலம்", "டிஜிட்டல் கலாச்சாரம்", "சமூக இயக்கங்கள்"],
        callTitle: "📢 இளைஞர்களுக்கான அழைப்பு",
        callBody: "உங்கள் அனுபவம், கருத்து, போராட்டம் அல்லது சாதனை — எங்களுடன் பகிருங்கள்.",
        articlesTitle: "📰 சமீபத்திய செய்திகள்",
        viewDetails: "விவரங்கள் காண",
        empty: "விரைவில் புதிய தகவல்கள் வரும்...",
    },
    en: {
        pageTitle: "Youth Desk",
        tagline: "Questions • Dreams • Voices",
        intro: "Young people are not just the future — they are the center of today's political and social change. This section speaks about the challenges, dreams, and struggles faced by students, young workers, and job-seeking youth.",
        perspective: "Democracy stays alive only when young people continue to question.",
        coversTitle: "Youth Desk Focus Areas",
        covers: ["Employment", "Education & examinations", "Student politics", "Mental health", "Digital culture", "Social movements"],
        callTitle: "📢 A Call to the Youth",
        callBody: "Your experience, opinion, struggle, or achievement — share it with us.",
        articlesTitle: "📰 Featured Updates",
        viewDetails: "View Details",
        empty: "Check back soon for updates...",
    },
};

export default function YouthDeskPage() {
    const [items, setItems] = useState<YouthDeskItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, "youth_desk"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as YouthDeskItem[];
                setItems(data);
            } catch (error) {
                console.error("Error fetching youth desk items:", error);
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {t.tagline}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">{t.pageTitle}</h1>
                    <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-8">{t.intro}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {t.covers.map((c, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300">
                                📌 {c}
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                        <p className="font-bold text-amber-400 mb-1">{t.callTitle}</p>
                        <p className="text-neutral-300 text-sm">{t.callBody}</p>
                    </div>
                </div>
                <div className="bg-amber-600 py-4">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <p className="text-white font-bold text-sm">🧠 {t.perspective}</p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-12 max-w-7xl">
                <h2 className="text-xl font-black text-neutral-800 mb-6">{t.articlesTitle}</h2>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <Users className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <p className="text-neutral-500 font-bold">{t.empty}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all group overflow-hidden flex flex-col h-full">
                                <div className="p-6 flex-1">
                                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                                </div>
                                {item.link && (
                                    <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between font-bold text-neutral-800 hover:text-amber-700 transition-colors">
                                            {t.viewDetails} <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
