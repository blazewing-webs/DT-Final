"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsCard from "@/components/news/NewsCard";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
    tn: {
        pageTitle: "பெண்கள் & பாலினம்",
        tagline: "பெண்கள் • பாலினம் • மனித மரியாதை",
        intro: "பெண் உரிமை என்பது ஒரு சலுகை அல்ல — அது மனித உரிமை. பெண்கள் மற்றும் பாலின சிறுபான்மையினர் அனுபவிக்கும் அடக்குமுறைகள், பாகுபாடுகள், வன்முறைகள் அனைத்தையும் திராவிட தலைமுறை இந்தப் பகுதியில் கேள்விக்குள் கொண்டு வருகிறது.",
        perspective: "பெண் விடுதலை ஒரு தனிப்பட்ட போராட்டம் அல்ல. அது சமூக மாற்றத்தின் அடையாளம். பெண்கள் சுதந்திரமாக இல்லாத சமூகத்தில் யாரும் உண்மையில் சுதந்திரமானவர்கள் அல்ல.",
        coversTitle: "இந்தப் பகுதியில் வரும் செய்திகள்",
        covers: ["பெண்களுக்கு எதிரான வன்முறை", "வேலை இடங்களில் பாலின பாகுபாடு", "திருமணம் & தனிப்பட்ட சுதந்திரம்", "திருநங்கைகள் & LGBTQ+ உரிமைகள்", "உடல் அரசியல் (Body Politics)", "சட்டம் & நடைமுறை"],
        articlesTitle: "📰 முக்கிய செய்திகள்",
        empty: "செய்திகள் விரைவில்...",
    },
    en: {
        pageTitle: "Women & Gender",
        tagline: "Women • Gender • Human Dignity",
        intro: "Women's rights are not a privilege — they are human rights. The oppression, discrimination, and violence faced by women and gender minorities are questioned and examined in this section by Diravida Thalaimurai.",
        perspective: "Women's liberation is not an individual struggle. It is a marker of social transformation. In a society where women are not free, no one is truly free.",
        coversTitle: "This Section Covers",
        covers: ["Violence against women", "Gender discrimination in workplaces", "Marriage & personal freedom", "Transgender & LGBTQ+ rights", "Body politics", "Law & its implementation"],
        articlesTitle: "📰 Featured Stories",
        empty: "Stories coming soon...",
    },
};

export default function WomenPage() {
    const { articles, loading } = useArticles("பெண்கள் நலம் (Women)", 20);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            {/* Editorial Intro Banner */}
            <div className="pt-28 pb-0 bg-neutral-900 text-white">
                <div className="container mx-auto px-6 max-w-5xl py-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 font-bold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                        {t.tagline}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">{t.pageTitle}</h1>
                    <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-8">{t.intro}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {t.covers.map((c, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300">
                                📌 {c}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-pink-700 py-4">
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
