"use client";

import { useArticles } from "@/hooks/useArticles";
import NewsCard from "./NewsCard";
import CategorySection from "./CategorySection";
import Link from "next/link";

interface CategoryFeedProps {
    title: string;
    queryCategory: string; // The exact string stored in Firestore (e.g. "அரசியல் (Politics)")
    href: string;
    limit?: number; // Optional limit
}

export default function CategoryFeed({ title, queryCategory, href, limit = 4 }: CategoryFeedProps) {
    const { articles, loading } = useArticles(queryCategory, limit);
    // Wait, my hook takes 'category' string. In Firestore I saved it as "Politics (அரசியல்)" or just "politics"?
    // I saved it as "Politics (English)" in the dropdown value `setCategory(CATEGORIES[0].name)`.
    // The name was "அரசியல் (Politics)". 
    // This might be tricky if I don't match exact strings. 
    // Ideally I should store a 'slug' for category or ID. 
    // In `NewArticlePage`, I used `cat.name` as value. 
    // Let's assume for now I'll fix the hook usage to match what's in DB.

    // Actually, in `NewArticlePage` I used:
    // { id: "politics", name: "அரசியல் (Politics)" }
    // and `setCategory(e.target.value)`. So it saves "அரசியல் (Politics)".

    // So I need to pass "அரசியல் (Politics)" to useArticles if I want to filter by it.
    // Or I should have saved the ID.
    // Let's update `useArticles` to handle this or just pass the exact string.

    return (
        <CategorySection title={title} href={href}>
            {loading ? (
                <div className="h-40 flex items-center justify-center bg-neutral-50 rounded-lg">
                    <span className="text-neutral-400 text-sm">Loading {title}...</span>
                </div>
            ) : articles.length === 0 ? (
                <div className="h-20 flex items-center justify-center border border-dashed border-neutral-300 rounded-lg">
                    <span className="text-neutral-400 text-sm">No articles in {title} yet.</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </CategorySection>
    );
}
