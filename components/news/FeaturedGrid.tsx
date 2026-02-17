"use client";

import NewsCard from "./NewsCard";
import DailyQuote from "./DailyQuote";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, limit, where, Timestamp, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FeaturedGridProps {
    // We keep these props optional now as we might fetch internally or accept initial data
    initialArticles?: any[];
}

export default function FeaturedGrid({ initialArticles }: FeaturedGridProps) {

    // Fetch 7 articles for the grid
    const { articles, loading } = useArticles(undefined, 7);

    // Dynamic Quote State
    const [activeQuote, setActiveQuote] = useState<{ text: string, author: string } | null>(null);

    useEffect(() => {
        // Find potential active quotes: StartTime <= Now
        // Ordered by StartTime descending (latest started first)
        const now = new Date();
        const q = query(
            collection(db, "quotes"),
            where("startTime", "<=", Timestamp.fromDate(now)),
            orderBy("startTime", "desc"),
            limit(1)
        );

        // Real-time listener for instant updates
        const unsubscribe = onSnapshot(q, (snap) => {
            if (!snap.empty) {
                const data = snap.docs[0].data();
                const startTime = data.startTime.toDate().getTime();
                const expirationTime = startTime + (24 * 60 * 60 * 1000); // 24 hours later

                if (Date.now() < expirationTime) {
                    setActiveQuote({
                        text: data.text,
                        author: data.author
                    });
                } else {
                    // The latest started quote has already expired.
                    console.log("Latest quote expired at:", new Date(expirationTime));
                    setActiveQuote(null);
                }
            } else {
                console.log("No started quotes found.");
                setActiveQuote(null);
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="h-[600px] flex items-center justify-center bg-neutral-100 rounded-xl mb-12">
                <Loader2 className="h-10 w-10 animate-spin text-neutral-400" />
            </div>
        );
    }

    // If no articles, we could show a fallback or just empty
    if (articles.length === 0) {
        return (
            <div className="h-[400px] flex items-center justify-center bg-neutral-100 rounded-xl mb-12 text-neutral-500">
                No articles found. Add some from the Admin Panel.
            </div>
        );
    }

    // Pattern:
    // [1 1 2 3]
    // [1 1 4 4]
    // [5 6 7 7]
    const gridItems = articles.slice(0, 7);

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 h-auto lg:h-[85vh] min-h-[600px] mb-12">

            {/* Bento Grid Section (Left - 9 Cols, or 12 if no quote) */}
            <div className={`${activeQuote ? 'lg:col-span-9' : 'lg:col-span-12'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] lg:grid-rows-3 gap-2 h-auto lg:h-full transition-all duration-500`}>
                {gridItems.map((article, index) => {
                    let gridClass = "";
                    let cardSize: "sm" | "md" | "lg" = "sm";

                    // Define grid spans and size based on index
                    // Mobile: Default to span 1.
                    // MD/LG: Apply complex spans.

                    // Layout changes slightly if quote is present or not to fill space nicely?
                    // For simplicity, let's keep the layout consistent for the first 7 items, 
                    // but if the quote is gone, we technically have empty space on the right (col-span-3).
                    // To fix this, we made the grid container 'lg:col-span-12' above if no quote.
                    // But we might want to adjust individual item spans too? 
                    // Let's stick to the 9-col layout logic for items, just stretching the container, 
                    // which might make them wider. That's actually fine/responsive!

                    switch (index) {
                        case 0:
                            gridClass = "md:col-span-2 md:row-span-2";
                            cardSize = "lg";
                            break;
                        case 1:
                        case 2:
                            gridClass = "md:col-span-1 md:row-span-1";
                            cardSize = "sm";
                            break;
                        case 3:
                            gridClass = "md:col-span-2 md:row-span-1";
                            cardSize = "md";
                            break;
                        case 4:
                        case 5:
                            gridClass = "md:col-span-1 md:row-span-1";
                            cardSize = "sm";
                            break;
                        case 6:
                            gridClass = "md:col-span-2 md:row-span-1";
                            cardSize = "md";
                            break;
                        default:
                            gridClass = "md:col-span-1 md:row-span-1";
                            cardSize = "sm";
                    }

                    return (
                        <div key={article.id} className={`relative group overflow-hidden rounded-xl ${gridClass}`}>
                            <NewsCard
                                title={article.title}
                                excerpt={index === 0 ? article.excerpt : undefined}
                                image={article.image}
                                category={article.category}
                                author={article.author}
                                date={article.date}
                                href={`/article?slug=${article.slug}`}
                                variant="overlay"
                                size={cardSize}
                                className="h-full w-full"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Daily Quote Section (Right - 3 Cols) - Conditionally Rendered */}
            {activeQuote && (
                <div className="lg:col-span-3 h-[400px] lg:h-full animate-in fade-in slide-in-from-right-10 duration-700">
                    <div className="h-full rounded-xl overflow-hidden">
                        <DailyQuote
                            quote={activeQuote.text}
                            author={activeQuote.author}
                            className="h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
