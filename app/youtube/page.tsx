"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Youtube, Play, Clock, Calendar, Share2, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Video {
    id: string;
    title: string;
    videoId: string;
    description?: string;
    date: string;
    thumbnail?: string;
    category?: string;
}

const content = {
    tn: {
        pageTitle: "திராவிட தலைமுறை டிவி",
        tagline: "காட்சிகளில் திராவிட அறம் • உண்மை • அறிவு",
        intro: "செய்திகளும் கருத்துகளும் இப்போது காட்சி வடிவில். கள ஆய்வுகள், நேர்காணல்கள் மற்றும் சமூக நீதி குறித்த விரிவான காணொளிகளை இங்கே காணலாம்.",
        perspective: "காட்சிகள் பேசும் உண்மைகள் என்றென்றும் நிலைக்கும்.",
        videoTitle: "📺 அண்மைக்கால காணொளிகள்",
        empty: "காணொளிகள் விரைவில்...",
        watchNow: "இப்போது காண்க",
        share: "பகிர்",
    },
    en: {
        pageTitle: "Diravida Thalaimurai TV",
        tagline: "Dravidian Ethics in Visuals • Truth • Knowledge",
        intro: "News and opinions now in visual format. Watch field reports, interviews, and detailed videos on social justice right here.",
        perspective: "Truths spoken through visuals last forever.",
        videoTitle: "📺 Recent Videos",
        empty: "Videos coming soon...",
        watchNow: "Watch Now",
        share: "Share",
    },
};

export default function YoutubePage() {
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Fetch from the same collection as the admin panel
                const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"), limit(12));
                const querySnapshot = await getDocs(q);
                const videoList: Video[] = [];
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Map admin data fields to our display interface
                    videoList.push({ 
                        id: doc.id, 
                        title: data.title,
                        videoId: data.videoId,
                        description: data.description || "",
                        // Format the server timestamp for display
                        date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : (isTamil ? "சமீபத்தியது" : "Recent"),
                        category: data.category || "Social"
                    } as Video);
                });

                if (videoList.length > 0) {
                    setVideos(videoList);
                } else {
                    // Fallback for demo if collection is empty
                    setVideos([
                        {
                            id: "1",
                            title: isTamil ? "சமூக நீதி மற்றும் பெரியார் சிந்தனைகள்" : "Social Justice and Periyar's Ideology",
                            videoId: "aqz-KE-bpKQ", 
                            date: "12/03/2024",
                            description: "A deep dive into social justice.",
                            category: "Ideology"
                        },
                        {
                            id: "2",
                            title: isTamil ? "திராவிட மாடல் - ஒரு பார்வை" : "Dravidial Model - A Perspective",
                            videoId: "KMpS9r-7Sow",
                            date: "10/03/2024",
                            description: "Understanding the Dravidian Model.",
                            category: "Politics"
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [isTamil]);

    // Handle initial selected video
    useEffect(() => {
        if (videos.length > 0 && !selectedVideo) {
            setSelectedVideo(videos[0]);
        }
    }, [videos, selectedVideo]);

    const handleShare = (videoId: string) => {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        if (navigator.share) {
            navigator.share({
                title: 'Watch this on Diravida Thalaimurai',
                url: url
            });
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            {/* Premium Hero Section */}
            <div className="pt-28 pb-0 bg-neutral-900 text-white">
                <div className="container mx-auto px-6 max-w-6xl py-12">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dravida-red/20 border border-dravida-red/40 text-dravida-red font-bold text-xs uppercase tracking-widest mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-dravida-red animate-pulse" />
                                {t.tagline}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                {isTamil ? "திராவிட" : "DIRAVIDA"}{" "}
                                <span className="text-dravida-red italic">TV</span>
                            </h1>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-lg">
                                {t.intro}
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-dravida-red hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-900/20 active:scale-95">
                                    <Play className="w-5 h-5 fill-current" /> {t.watchNow}
                                </button>
                                <a 
                                    href="https://youtube.com/@diravidathalaimurai" 
                                    target="_blank" 
                                    className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
                                >
                                    <Youtube className="w-5 h-5 text-dravida-red" /> Subscribe
                                </a>
                            </div>
                        </div>

                        {/* Featured Video Player */}
                        <div className="w-full lg:w-1/2">
                            {selectedVideo ? (
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/10 bg-neutral-800 group">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=0&rel=0`}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-video bg-neutral-800 rounded-3xl animate-pulse flex items-center justify-center">
                                    <Play className="w-12 h-12 text-neutral-700" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Perspective Bar */}
                <div className="bg-dravida-red/10 border-t border-white/5 py-4">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex items-center gap-4 text-neutral-400">
                             <div className="w-2 h-2 rounded-full bg-dravida-red animate-ping" />
                             <p className="text-sm font-bold tracking-wide uppercase italic text-white/90">
                                {t.perspective}
                             </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Gallery */}
            <section className="container mx-auto px-6 py-16 max-w-7xl">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{t.videoTitle}</h2>
                        <div className="h-1.5 w-12 bg-dravida-red rounded-full" />
                    </div>
                    
                    <div className="hidden md:flex gap-2">
                        {/* Filter placeholders */}
                        {["All", "Politics", "Society", "History"].map(cat => (
                            <button key={cat} className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-dravida-red hover:bg-red-50 transition-all border border-neutral-200">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-neutral-400 gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-dravida-red" />
                        <p className="font-bold animate-pulse">Loading Archive...</p>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-neutral-100 flex flex-col items-center gap-4">
                        <Youtube className="w-16 h-16 text-neutral-200" />
                        <p className="text-lg font-bold text-neutral-400">{t.empty}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {videos.map((video) => (
                            <div 
                                key={video.id} 
                                className={`group flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${selectedVideo?.id === video.id ? 'border-dravida-red ring-4 ring-dravida-red/5' : 'border-neutral-100 hover:border-neutral-300 hover:shadow-xl hover:-translate-y-1'}`}
                                onClick={() => {
                                    setSelectedVideo(video);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                {/* Thumbnail Container */}
                                <div className="relative aspect-video overflow-hidden">
                                     <img 
                                        src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                     />
                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                                             <Play className="w-5 h-5 fill-current" />
                                         </div>
                                     </div>
                                     <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                                         {video.category || "Feature"}
                                     </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 
                                        className="font-bold text-neutral-900 mb-3 line-clamp-2 leading-tight group-hover:text-dravida-red transition-colors text-sm"
                                        title={video.title}
                                    >
                                        {video.title}
                                    </h3>
                                    
                                    <div className="mt-auto flex items-center justify-between text-neutral-500 border-t border-neutral-50 pt-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3 text-neutral-400" />
                                                <span className="text-[11px] font-bold">{video.date}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(video.videoId);
                                            }}
                                            className="p-2 hover:bg-neutral-100 rounded-full transition-colors group/share"
                                        >
                                            <Share2 className="w-4 h-4 group-hover/share:text-dravida-red" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* YouTube Subscription Card */}
                {!loading && (
                    <div className="mt-20 bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-dravida-red/10 rounded-full blur-3xl group-hover:bg-dravida-red/20 transition-colors" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-3 text-dravida-red mb-4">
                                    <Youtube className="w-8 h-8" />
                                    <span className="text-xl font-black italic tracking-tighter uppercase">YouTube</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-4">{isTamil ? "எங்கள் யூடியூப் சேனலை சப்ஸ்கிரைப் செய்யுங்கள்" : "Subscribe to our YouTube Channel"}</h3>
                                <p className="text-neutral-400 max-w-xl font-medium">
                                    {isTamil 
                                        ? "நேரடி செய்திகள், வாதங்கள் மற்றும் சிறப்பு காணொளிகளை உடனுக்குடன் பெற எங்கள் தளத்தை சப்ஸ்கிரைப் செய்யுங்கள்."
                                        : "Get instant access to live news, debates, and exclusive videos by subscribing to our platform."
                                    }
                                </p>
                            </div>
                            <a 
                                href="https://youtube.com/@diravidathalaimurai" 
                                target="_blank"
                                className="bg-dravida-red hover:bg-red-700 px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-xl shadow-red-900/40 active:scale-95 whitespace-nowrap"
                            >
                                {isTamil ? "இணைவோம்" : "Subscribe Now"} <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
