"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Existing Components
import HeritageHero from "@/components/home/HeritageHero";
import IdeologySection from "@/components/home/IdeologySection"; // Now Principles
import TimelineSection from "@/components/home/TimelineSection"; // Now History
import BookRecommendations from "@/components/home/BookRecommendations";
import JoinCTA, { Disclaimer } from "@/components/home/JoinCTA";

// New Components from About Page Refactor
import AboutIntro from "@/components/home/AboutIntro";
import DreamSection from "@/components/home/DreamSection";
import MissionSection from "@/components/home/MissionSection";
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

            {/* 2. About Us Introduction */}
            <AboutIntro />

            {/* 3. Our Dream */}
            <DreamSection />

            {/* 4. Our Mission */}
            <MissionSection />

            {/* 5. History Timeline */}
            <TimelineSection />

            {/* 6. Principles (Ideology) */}
            <IdeologySection />

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
