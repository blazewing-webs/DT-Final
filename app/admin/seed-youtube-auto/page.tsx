"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/admin/AuthContext";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const videos = [
    {
        title: "Dravidian Ideology Explained",
        url: "https://youtu.be/kKl9qPDtYZc?si=2CjXQvcFWqLxByMF",
        videoId: "kKl9qPDtYZc"
    },
    {
        title: "History of the Movement",
        url: "https://youtu.be/XVlUG6wlVJs?si=R7Yjkw-lZEdV7_-v",
        videoId: "XVlUG6wlVJs"
    },
    {
        title: "Social Justice Impact",
        url: "https://youtu.be/ybid6nvZ528?si=ThxIzhv2yIJwZ4zm",
        videoId: "ybid6nvZ528"
    }
];

export default function AutoSeeder() {
    const { user, loading: authLoading } = useAuth();
    const [status, setStatus] = useState("initializing");
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setStatus("error");
            setLog(prev => [...prev, "User not logged in. Please log in to admin first."]);
            return;
        }

        const seed = async () => {
            setStatus("working");
            try {
                for (const video of videos) {
                    await addDoc(collection(db, "youtube_videos"), {
                        ...video,
                        createdAt: serverTimestamp()
                    });
                    setLog(prev => [...prev, `Added: ${video.title}`]);
                }
                setStatus("success");
            } catch (error: any) {
                console.error(error);
                setStatus("error");
                setLog(prev => [...prev, `Error: ${error.message}`]);
            }
        };

        seed();
    }, [user, authLoading]);

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-xl font-bold mb-4">Auto-Seeding YouTube Videos</h1>

                <div className="space-y-2 mb-6 max-h-48 overflow-y-auto bg-neutral-100 p-4 rounded-lg text-sm font-mono">
                    {log.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                    {status === "working" && (
                        <div className="flex items-center gap-2 text-blue-600">
                            <Loader2 className="w-3 h-3 animate-spin" /> Processing...
                        </div>
                    )}
                </div>

                {status === "success" && (
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-green-600 font-bold mb-4">
                            <CheckCircle className="w-6 h-6" /> Success!
                        </div>
                        <Link href="/" className="block w-full py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 text-center font-bold">
                            Go to Homepage
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div className="text-center text-red-600 font-bold">
                        <XCircle className="w-8 h-8 mx-auto mb-2" />
                        Failed. Check logs.
                    </div>
                )}
            </div>
        </div>
    );
}
