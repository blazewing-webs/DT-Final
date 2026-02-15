import FeaturedGrid from "@/components/news/FeaturedGrid";

import CategoryFeed from "@/components/news/CategoryFeed"; // Added
import CategorySection from "@/components/news/CategorySection";
import NewsCard from "@/components/news/NewsCard";
import Sidebar from "@/components/news/Sidebar";
import LiveTimeline from "@/components/news/LiveTimeline";

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";

// Extra Content Components
import QuoteBanner from "@/components/home/QuoteBanner";
import IdeologySection from "@/components/home/IdeologySection";
import TimelineSection from "@/components/home/TimelineSection";
import BookRecommendations from "@/components/home/BookRecommendations";
import FAQSection from "@/components/home/FAQSection";
import JoinCTA, { Disclaimer } from "@/components/home/JoinCTA";

// --- Static Data Removed ---
// All data is now fetched dynamically via SidebarWrapper, FeaturedGrid, CategoryFeed, and LiveTimeline.

import Footer from "@/components/layout/Footer";

import SidebarWrapper from "@/components/news/SidebarWrapper";

export default function Home() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <TopBar />
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Featured Section (Bento Grid - Needs 7 items) */}
                <FeaturedGrid
                    quote="மலைகளின் அரசியே, நீலகிரியே! உன் வளம் காப்போம், உன் நலம் காப்போம்."
                    quoteAuthor="குன்னூர் நிருபர்"
                />
            </div>



            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Politics Section */}
                        <CategoryFeed
                            title="அரசியல்"
                            queryCategory="அரசியல் (Politics)"
                            href="/politics"
                        />

                        {/* Education Section */}
                        <CategoryFeed
                            title="கல்வி"
                            queryCategory="கல்வி (Education)"
                            href="/education"
                        />

                        {/* History Section */}
                        <CategoryFeed
                            title="வரலாறு"
                            queryCategory="வரலாறு (History)"
                            href="/history"
                        />

                        {/* Society Section */}
                        <CategoryFeed
                            title="சமூகம்"
                            queryCategory="சமூகம் (Society)"
                            href="/society"
                        />

                        {/* Women's Welfare Section */}
                        <CategoryFeed
                            title="பெண்கள் நலம்"
                            queryCategory="பெண்கள் நலம் (Women)"
                            href="/women"
                        />
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 h-full relative">
                        {/* Dynamic Sidebar */}
                        <SidebarWrapper />



                        {/* Sticky Timeline */}
                        <div className="sticky top-24 mt-8">
                            <LiveTimeline />
                        </div>
                    </div>
                </div>
            </div>
            {/* Static Content Sections */}
            <TimelineSection />
            <FAQSection />

            <Footer />
        </main>
    );
}
