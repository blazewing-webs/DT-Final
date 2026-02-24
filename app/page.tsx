"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Existing Components
import HeritageHero from "@/components/home/HeritageHero";
import TimelineSection from "@/components/home/TimelineSection"; // Now History
import BookRecommendations from "@/components/home/BookRecommendations";
import JoinCTA, { Disclaimer } from "@/components/home/JoinCTA";

// New Components from About Page Refactor
import AboutUsSection from "@/components/home/AboutUsSection";
import VisionMissionSection from "@/components/home/VisionMissionSection";
import PolicyContent from "@/components/home/PolicyContent";
import YouthVoiceSection from "@/components/home/YouthVoiceSection";
import QuotesGrid from "@/components/home/QuotesGrid";
import FactCheckSection from "@/components/home/FactCheckSection";

// Optional/Legacy (Keep if desired, otherwise comment out to streamline)
import FAQSection from "@/components/home/FAQSection";
import VideoSection from "@/components/home/VideoSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* 1. Hero Section */}
            <HeritageHero />

            {/* FeaturedGrid Removed - Moved to /news */}

            {/* 2. About Us Section */}
            <AboutUsSection />

            <VisionMissionSection />

            {/* 3. Detailed Policy Content */}
            <PolicyContent />

            {/* 6. History Timeline */}
            <TimelineSection />

            {/* 7. Youth Voice Parallax */}
            <YouthVoiceSection />

            {/* 8. Quotes Grid */}
            <QuotesGrid />

            {/* 9. Additional Content (Books, Videos, FAQs) */}
            <BookRecommendations />

            {/* 
            <VideoSection />
            <FAQSection /> 
            */}


            {/* 10. Fact Check Section */}
            <FactCheckSection />

            {/* 11. Call to Action */}
            <JoinCTA />

            <Disclaimer />
            <Footer />
        </main>
    );
}
