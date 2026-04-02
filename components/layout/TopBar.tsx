"use client";

import { Facebook, Twitter, Instagram, Youtube, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TopBar() {
    const [breakingNews, setBreakingNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const currentDate = new Date().toLocaleDateString('ta-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchBreakingNews = async () => {
            try {
                const q = query(
                    collection(db, "articles"),
                    where("priority", "==", "Breaking (Big)"),
                    orderBy("date", "desc"),
                    limit(5)
                );
                const querySnapshot = await getDocs(q);
                const news = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Duplicate for seamless marquee if there's enough items
                setBreakingNews(news);
            } catch (error) {
                console.error("Error fetching breaking news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBreakingNews();
    }, []);

    // Create a doubled list for seamless marquee loop
    const doubledNews = [...breakingNews, ...breakingNews];

    return (
        <div className="bg-[#111] text-white py-2 text-xs font-sans border-b border-neutral-800 hidden md:block overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-8">
                {/* Date & Breaking News Label */}
                <div className="flex items-center gap-4 shrink-0 relative z-10 bg-[#111] pr-4">
                    <div className="text-neutral-400 font-medium whitespace-nowrap">
                        {currentDate}
                    </div>
                    <div className="flex items-center gap-2 bg-dravida-red px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                        <AlertCircle className="h-3 w-3" />
                        Breaking
                    </div>
                </div>

                {/* Ticker Container */}
                <div className="flex-1 relative overflow-hidden h-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className={`flex gap-12 whitespace-nowrap ${breakingNews.length > 0 ? 'animate-marquee' : ''}`}>
                            {breakingNews.length > 0 ? (
                                doubledNews.map((news, idx) => (
                                    <Link
                                        key={`${news.id}-${idx}`}
                                        href={`/article/${news.slug}`}
                                        className="hover:text-dravida-red transition-colors flex items-center gap-2 font-bold text-neutral-300"
                                    >
                                        <span className="text-dravida-red/50 text-base">•</span>
                                        {news.title}
                                    </Link>
                                ))
                            ) : loading ? (
                                <span className="text-neutral-500 animate-pulse italic">செய்திகள் புதுப்பிக்கப்படுகின்றன...</span>
                            ) : (
                                <span className="text-neutral-600 italic">திராவிட தலைமுறை — சிந்தனை ஒரு புரட்சி...</span>
                            )}
                        </div>
                    </div>
                    {/* Shadow fades for the ticker */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#111] to-transparent z-0 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#111] to-transparent z-0 pointer-events-none"></div>
                </div>

                {/* Socials & Staff */}
                <div className="flex items-center gap-4 shrink-0 relative z-10 bg-[#111] pl-4">
                    <div className="flex items-center gap-3 border-r border-neutral-700 pr-4">
                        <a href="https://www.facebook.com/profile.php?id=61575443348208" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-dravida-red transition-colors" title="Facebook"><Facebook className="h-3.5 w-3.5" /></a>
                        <a href="https://x.com/diravida_news" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-dravida-red transition-colors" title="Twitter"><Twitter className="h-3.5 w-3.5" /></a>
                        <a href="https://www.instagram.com/diravida_thalaimurai/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-dravida-red transition-colors" title="Instagram"><Instagram className="h-3.5 w-3.5" /></a>
                        <a href="https://www.youtube.com/@DIRAVIDATHALAIIMURAI" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-dravida-red transition-colors" title="YouTube"><Youtube className="h-3.5 w-3.5" /></a>
                    </div>
                    <Link href="/admin/login" className="hover:text-white transition-colors uppercase font-black text-neutral-500 tracking-[0.2em] text-[8px]">
                        Staff
                    </Link>
                </div>
            </div>
        </div>
    );
}

