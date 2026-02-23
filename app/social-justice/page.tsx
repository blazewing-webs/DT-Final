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
        pageTitle: "சமூக நீதி செய்திகள்",
        tagline: "சமத்துவம் • உரிமை • மனித மரியாதை",
        intro: "சமூக நீதி என்பது கோஷம் அல்ல — அது ஒவ்வொரு மனிதருக்கும் உரிமையாக கிடைக்க வேண்டிய அடிப்படை. திராவிட தலைமுறை சாதி, பாலினம், மொழி, வர்க்கம் ஆகிய அடிப்படையில் நடைபெறும் அநீதிகளை வெளிச்சத்துக்கு கொண்டு வரும் செய்திகளை இந்தப் பகுதியில் வழங்குகிறது.",
        perspective: "சமூக நீதி என்பது ஒரே நாளில் கிடைக்கும் பரிசு அல்ல. அது தொடர்ந்து கேள்வி கேட்கும் சமூகத்தின் வெற்றி.",
        coversTitle: "இந்தப் பகுதியில் வரும் செய்திகள்",
        covers: ["சாதி ஒழிப்பு", "பெண்கள் உரிமை", "கல்வி சமத்துவம்", "சிறுபான்மையினர் உரிமைகள்", "திருநங்கைகள் & LGBTQ+ உரிமைகள்", "தொழிலாளர் & வர்க்க அநீதி"],
        articlesTitle: "📰 செய்திகள்",
        empty: "செய்திகள் விரைவில்...",
    },
    en: {
        pageTitle: "Social Justice News",
        tagline: "Equality • Rights • Human Dignity",
        intro: "Social justice is not a slogan — it is a fundamental right that must reach every human being. Diravida Thalaimurai brings to light news that exposes injustices based on caste, gender, language, and class in this section.",
        perspective: "Social justice is not a reward gained in a single day. It is the achievement of a society that continues to question power.",
        coversTitle: "This Section Covers",
        covers: ["Annihilation of caste", "Women's rights", "Equality in education", "Minority rights", "Transgender & LGBTQ+ rights", "Labour rights & class injustice"],
        articlesTitle: "📰 Featured Stories",
        empty: "Stories coming soon...",
    },
};

export default function SocialJusticePage() {
    const { articles, loading } = useArticles("சமூக நீதி (Social Justice)");
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
                    <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-8">{t.intro}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {t.covers.map((c, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300">
                                📌 {c}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Perspective bar */}
                <div className="bg-dravida-red py-4">
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
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <p className="text-lg font-bold text-neutral-500">{t.empty}</p>
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
