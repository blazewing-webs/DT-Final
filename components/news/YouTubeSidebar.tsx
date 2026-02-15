"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Youtube } from "lucide-react";

interface YouTubeVideo {
    id: string;
    title: string;
    url: string;
    videoId: string;
}

export default function YouTubeSidebar() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const q = query(
                    collection(db, "youtube_videos"),
                    orderBy("createdAt", "desc"),
                    limit(5)
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

    if (loading) {
        return <div className="p-4 bg-neutral-50 rounded-lg animate-pulse h-64"></div>;
    }

    if (videos.length === 0) {
        return (
            <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                <div className="mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-bold text-neutral-900">
                        காணொளிகள் (Videos)
                    </h3>
                </div>
                <div className="text-neutral-500 text-sm italic">
                    No videos available. Please add them in Admin &rarr; YouTube.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2">
                <Youtube className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                    காணொளிகள் (Videos)
                </h3>
            </div>
            <div className="space-y-6">
                {videos.map((video) => (
                    <div key={video.id} className="group">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-2 shadow-sm">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <h4 className="font-bold text-sm text-neutral-800 line-clamp-2 group-hover:text-red-700 transition-colors">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                                {video.title}
                            </a>
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
