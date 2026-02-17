"use client";

import FeaturedGrid from "@/components/news/FeaturedGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsFeed from "@/components/news/NewsFeed";
import { Zap } from "lucide-react";

export default function NewsPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="container mx-auto px-4 pt-28 pb-12">
                {/* Featured News Grid (User Requested Location) */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-neutral-200 pb-4">
                        <span className="w-2 h-8 bg-dravida-red rounded-full"></span>
                        முக்கிய செய்திகள் (Top Stories)
                    </h2>
                    <FeaturedGrid />
                </section>

                {/* All News Feed with Filters */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-neutral-200 pb-4">
                        <span className="w-2 h-8 bg-neutral-800 rounded-full"></span>
                        அனைத்து செய்திகள் (All News)
                    </h2>
                    <NewsFeed />
                </section>
            </div>

            <Footer />
        </main>
    );
}
