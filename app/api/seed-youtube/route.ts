
import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function GET() {
    try {
        for (const video of videos) {
            await addDoc(collection(db, "youtube_videos"), {
                ...video,
                createdAt: serverTimestamp()
            });
        }
        return NextResponse.json({ success: true, message: "Videos seeded successfully!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
