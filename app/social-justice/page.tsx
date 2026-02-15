"use client";

import { useArticles } from "@/hooks/useArticles";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import NewsCard from "@/components/news/NewsCard";
import { Loader2 } from "lucide-react";

export default function SocialJusticePage() {
    // Note: Ensure the category string matches what's stored in Firestore.
    // Based on app/page.tsx, it might be "சமூக நீதி (Social Justice)"
    const { articles, loading } = useArticles("சமூக நீதி (Social Justice)");

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="சமூக நீதி (Social Justice)"
                description="சமூக நீதி சார்ந்த செய்திகள் மற்றும் கட்டுரைகள்"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Social Justice", href: "/social-justice" },
                ]}
            />

            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <p className="text-lg font-bold text-neutral-500">No articles found in this category.</p>
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
