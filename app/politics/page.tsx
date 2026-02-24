"use client";

import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsCard from "@/components/news/NewsCard";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
    tn: {
        pageTitle: "அரசியல் செய்திகள்",
        tagline: "அதிகாரம் • ஜனநாயகம் • மக்கள் உரிமை",
        intro: "அரசியல் என்பது வாக்குறுதிகளின் விளையாட்டு அல்ல — மக்களின் வாழ்க்கையை மாற்றும் முக்கியமான அதிகார அமைப்பு. திராவிட தலைமுறை அரசு, கட்சிகள், அதிகார மையங்கள் எடுக்கும் முடிவுகள் மக்களை எவ்வாறு பாதிக்கின்றன என்பதை இந்தப் பகுதியில் வெளிச்சம் போடுகிறது.",
        stand: "நாங்கள் ஆதரிக்கவும் இல்லை, எதிர்க்கவும் இல்லை — நாங்கள் கேள்வி கேட்கிறோம்.",
        perspective: "அரசியல் என்பது பதவி பெறுவதற்கான பாதை மட்டும் அல்ல. அது சமத்துவம் உருவாக்கும் சாதனமாக மாற வேண்டும்.",
        coversTitle: "இந்தப் பகுதியில் வரும் செய்திகள்",
        covers: ["சமூக நீதி அரசியல்", "இடஒதுக்கீடு & சட்ட மாற்றங்கள்", "மாநில சுயாட்சி", "தேர்தல் & ஜனநாயகம்", "அதிகார மையப்படுத்தல்", "மக்கள் உரிமைகள்"],
        articlesTitle: "📰 முக்கிய அரசியல் செய்திகள்",
        empty: "செய்திகள் விரைவில்...",
        featuredStories: [
            {
                id: "mock1",
                title: "இடஒதுக்கீடு அரசியல் – உரிமையா? இலவசமா?",
                excerpt: "இடஒதுக்கீடு என்பது சமூக நீதி கருவியா அல்லது அரசியல் வாக்கு ஆயுதமா என்ற விவாதம் மீண்டும் தீவிரமாகியுள்ளது.",
                image: "https://images.unsplash.com/photo-1541872516-6cbf204e92b3?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "அரசியல் (Politics)",
                author: "திராவிட தலைமுறை குறிப்பு"
            },
            {
                id: "mock2",
                title: "மாநில உரிமைகள் vs மத்திய அதிகாரம்",
                excerpt: "மாநிலங்களின் அதிகாரங்கள் மெல்ல மெல்ல மத்திய அரசிடம் குவிக்கப்படுகிறதா? கூட்டாட்சியின் எதிர்காலம் கேள்விக்குறியாகியுள்ளது.",
                image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "அரசியல் (Politics)",
                author: "திராவிட தலைமுறை குறிப்பு"
            },
            {
                id: "mock3",
                title: "தேர்தல் வாக்குறுதிகள் – நிறைவேற்றலா? மறப்பா?",
                excerpt: "வேலைவாய்ப்பு, கல்வி, சமூக நலன் என்ற வாக்குறுதிகள் தேர்தலுக்குப் பின் எங்கே போகின்றன? மக்கள் எழுப்பும் கேள்விகள்.",
                image: "https://images.unsplash.com/photo-1529683693425-4c07920abfb6?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "அரசியல் (Politics)",
                author: "திராவிட தலைமுறை குறிப்பு"
            },
            {
                id: "mock4",
                title: "எதிர்க்கட்சியின் குரல் – கேட்கப்படுகிறதா?",
                excerpt: "நாடாளுமன்றம் மற்றும் சட்டமன்றங்களில் எதிர்க்கட்சிகள் எழுப்பும் கேள்விகள் உண்மையில் விவாதிக்கப்படுகிறதா? ஜனநாயகத்தின் நிலை.",
                image: "https://images.unsplash.com/photo-1536647413620-318e8df6ffbe?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "அரசியல் (Politics)",
                author: "திராவிட தலைமுறை குறிப்பு"
            },
            {
                id: "mock5",
                title: "அரசியல் & ஊடக சுதந்திரம்",
                excerpt: "அரசியல் அழுத்தங்கள் ஊடகங்களின் சுதந்திரத்தை மூச்சுத்திணற வைக்கிறதா? உண்மை செய்திகளின் எதிர்காலம் ஆபத்தில் உள்ளதா?",
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "அரசியல் (Politics)",
                author: "திராவிட தலைமுறை குறிப்பு"
            }
        ]
    },
    en: {
        pageTitle: "Political News",
        tagline: "Power • Democracy • People's Rights",
        intro: "Politics is not a game of promises — it is a powerful structure that shapes and transforms people's lives. Diravida Thalaimurai examines how decisions taken by governments, political parties, and centres of power affect the people, and brings them to light in this section.",
        stand: "We do not support. We do not oppose. We question.",
        perspective: "Politics is not merely a path to power or position. It must become a tool to create equality.",
        coversTitle: "This Section Covers",
        covers: ["Politics of social justice", "Reservation & legal reforms", "State autonomy", "Elections & democracy", "Centralisation of power", "People's rights"],
        articlesTitle: "📰 Featured Political Stories",
        empty: "Stories coming soon...",
        featuredStories: [
            {
                id: "mock1",
                title: "Reservation Politics — Right or Freebie?",
                excerpt: "Is reservation a tool of social justice, or has it become a political weapon for votes? The debate has once again intensified.",
                image: "https://images.unsplash.com/photo-1541872516-6cbf204e92b3?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "Political News",
                author: "Editorial Team"
            },
            {
                id: "mock2",
                title: "State Rights vs Central Power",
                excerpt: "Are the powers of states gradually being concentrated in the hands of the central government? The future of federalism is under question.",
                image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "Political News",
                author: "Editorial Team"
            },
            {
                id: "mock3",
                title: "Election Promises — Fulfilled or Forgotten?",
                excerpt: "Promises related to employment, education, and social welfare — where do they go after elections? Questions raised by the people.",
                image: "https://images.unsplash.com/photo-1529683693425-4c07920abfb6?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "Political News",
                author: "Editorial Team"
            },
            {
                id: "mock4",
                title: "The Voice of the Opposition — Is It Being Heard?",
                excerpt: "Are the questions raised by opposition parties in Parliament and legislative assemblies actually being debated? The state of democracy under scrutiny.",
                image: "https://images.unsplash.com/photo-1536647413620-318e8df6ffbe?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "Political News",
                author: "Editorial Team"
            },
            {
                id: "mock5",
                title: "Politics & Media Freedom",
                excerpt: "Are political pressures suffocating media freedom? Is the future of truthful journalism at risk?",
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
                date: "Feb 2026",
                category: "Political News",
                author: "Editorial Team"
            }
        ]
    },
};

export default function PoliticsPage() {
    const { articles, loading } = useArticles("அரசியல் (Politics)", 20);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            {/* Editorial Intro Banner */}
            <div className="pt-28 pb-0 bg-neutral-900 text-white">
                <div className="container mx-auto px-6 max-w-5xl py-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dravida-red/20 border border-dravida-red/40 text-dravida-red font-bold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-dravida-red animate-pulse" />
                        {t.tagline}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">{t.pageTitle}</h1>
                    <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-4">{t.intro}</p>
                    <p className="text-amber-400 font-bold italic mb-8">{t.stand}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {t.covers.map((c, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300">
                                📌 {c}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-dravida-red py-4">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <p className="text-white font-bold text-sm">🧠 {t.perspective}</p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 py-12 max-w-7xl">
                <h2 className="text-xl font-black text-neutral-800 mb-6">{t.articlesTitle}</h2>
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Display featured mocked stories first */}
                        {t.featuredStories.map((article) => (
                            <NewsCard
                                key={article.id}
                                title={article.title}
                                excerpt={article.excerpt}
                                image={article.image}
                                category={article.category}
                                author={article.author}
                                date={article.date}
                                href={`/`}
                                variant="standard"
                                className="h-full"
                            />
                        ))}
                        {/* Display real articles directly below */}
                        {articles.map((article) => (
                            <NewsCard
                                key={article.id}
                                title={article.title}
                                excerpt={article.excerpt}
                                image={article.image}
                                category={article.category}
                                author={article.author}
                                date={article.date}
                                href={`/article?slug=${article.slug}`}
                                variant="standard"
                                className="h-full"
                            />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
