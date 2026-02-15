"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Youtube, Play, Share2 } from "lucide-react";

interface YouTubeVideo {
    id: string;
    title: string;
    url: string;
    videoId: string;
}

export default function VideoSection() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const q = query(
                    collection(db, "youtube_videos"),
                    orderBy("createdAt", "desc"),
                    limit(10)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as YouTubeVideo[];
                setVideos(data);
            } catch (error) {
                console.error("Error fetching YouTube videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading || videos.length === 0) {
        return null;
    }

    // Featured video (first one)
    const featuredVideo = videos[0];
    // Remaining videos
    const otherVideos = videos.slice(1);

    return (
        <section className="py-20 relative overflow-hidden bg-neutral-50 text-neutral-900">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">காணொளிகள்</h2>
                        <p className="text-neutral-600">Dravidian Ideology & History</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Main Featured Video */}
                    <div className="lg:w-2/3 group cursor-pointer flex flex-col">
                        <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-xl border border-neutral-200 w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${featuredVideo.videoId}`}
                                title={featuredVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-red-700 transition-colors">
                                {featuredVideo.title}
                            </h3>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.youtube.com/@DIRAVIDATHALAIMURAI"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition-colors text-sm shadow-md hover:shadow-lg"
                                >
                                    <Youtube className="w-4 h-4" />
                                    Subscribe
                                </a>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(window.location.href);
                                        alert("Link copied to clipboard!");
                                    }}
                                    className="flex items-center gap-2 bg-white text-neutral-900 border border-neutral-200 px-5 py-2 rounded-full font-bold hover:bg-neutral-50 transition-colors text-sm shadow-sm hover:shadow-md"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Side List */}
                    <div className="lg:w-1/3 relative min-h-[400px] lg:min-h-0">
                        <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                            {otherVideos.map((video) => (
                                <div key={video.id} className="flex gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-neutral-100">
                                    <div className="w-40 aspect-video bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                                                <Play className="w-3 h-3 text-white fill-white" />
                                            </div>
                                        </div>
                                        {/* Link overlay */}
                                        <a
                                            href={video.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="absolute inset-0 z-10"
                                        ></a>
                                    </div>
                                    <div className="flex-1 py-1">
                                        <h4 className="font-bold text-neutral-900 text-sm line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
                                            <a href={video.url} target="_blank" rel="noreferrer">
                                                {video.title}
                                            </a>
                                        </h4>
                                        <p className="text-neutral-500 text-xs mt-2">Watch on YouTube</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
