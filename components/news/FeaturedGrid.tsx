"use client";

import NewsCard from "./NewsCard";
import DailyQuote from "./DailyQuote";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";

interface FeaturedGridProps {
    // We keep these props optional now as we might fetch internally or accept initial data
    initialArticles?: any[];
    quote: string;
    quoteAuthor: string;
}

export default function FeaturedGrid({ quote, quoteAuthor }: FeaturedGridProps) {
    // Fetch 7 articles for the grid
    const { articles, loading } = useArticles(undefined, 7);

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

            {/* Bento Grid Section (Left - 9 Cols) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] lg:grid-rows-3 gap-2 h-auto lg:h-full">
                {gridItems.map((article, index) => {
                    let gridClass = "";
                    let cardSize: "sm" | "md" | "lg" = "sm";

                    // Define grid spans and size based on index
                    // Mobile: Default to span 1.
                    // MD/LG: Apply complex spans.

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

            {/* Daily Quote Section (Right - 3 Cols) */}
            <div className="lg:col-span-3 h-[400px] lg:h-full">
                <div className="h-full rounded-xl overflow-hidden">
                    <DailyQuote
                        quote={quote}
                        author={quoteAuthor}
                        className="h-full"
                    />
                </div>
            </div>

        </div>
    );
}
