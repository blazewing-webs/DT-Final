"use client";

import { useState } from "react";
import { useArticles } from "@/hooks/useArticles";
import NewsCard from "./NewsCard";
import { Loader2 } from "lucide-react";

// Matches Firestore 'category' field values
const CATEGORIES = [
    { id: "all", label: "அனைத்தும் (All)" },
    { id: "politics", value: "அரசியல் (Politics)", label: "அரசியல்" },
    { id: "history", value: "வரலாறு (History)", label: "வரலாறு" },
    { id: "society", value: "சமூகம் (Society)", label: "சமூகம்" },
    { id: "women", value: "பெண்கள் (Women)", label: "பெண்கள்" },
    { id: "education", value: "கல்வி (Education)", label: "கல்வி" },
    { id: "environment", value: "சுற்றுச்சூழல் (Environment)", label: "சுற்றுச்சூழல்" },
    { id: "cinema", value: "திரைப்படம் (Cinema)", label: "திரைப்படம்" }
];

export default function NewsFeed() {
    const [activeCategory, setActiveCategory] = useState("all");
    const categoryQuery = activeCategory === "all" ? undefined : CATEGORIES.find(c => c.id === activeCategory)?.value;

    const { articles, loading } = useArticles(categoryQuery, 20); // Fetch top 20

    return (
        <div>
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-8 items-center justify-center md:justify-start">
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive
                                    ? "bg-dravida-red text-white shadow-lg scale-105"
                                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Articles Grid */}
            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                </div>
            ) : articles.length === 0 ? (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl">
                    <p className="text-neutral-500 font-medium">No articles found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {articles.map((article) => (
                        <div key={article.id} className="h-full">
                            <NewsCard
                                title={article.title}
                                excerpt={article.excerpt}
                                image={article.image}
                                category={article.category}
                                author={article.author}
                                date={article.date}
                                href={`/article?slug=${article.slug}`}
                                variant="standard"
                                size="sm"
                                className="h-full bg-white shadow-sm hover:shadow-md transition-shadow"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
