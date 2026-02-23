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
                ) : articles.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        <p>{t.empty}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
