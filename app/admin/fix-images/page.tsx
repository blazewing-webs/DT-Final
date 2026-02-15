"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, CheckCircle, RefreshCw } from "lucide-react";

// Map of partial titles to KNOWN GOOD images
const FIX_MAP: Record<string, string> = {
    "சட்டப்பேரவையில்": "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80", // Politics/Assembly
    "தமிழக பட்ஜெட்": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", // Budget/Finance
    "புதிய கல்விக்": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", // Education
    "அரசுப் பள்ளி": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", // Students
    "கலைஞர் மகளிர்": "https://images.unsplash.com/photo-1607748851687-ba4484e6d2df?w=800&q=80", // Women (hands)
    "பெண் தொழில்முனைவோருக்கான": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80", // Business woman
    "திராவிட மாடல்": "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80", // Society/Technology/Future
    "ஜாதி மறுப்புத்": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80", // Wedding/Couple
    "கீழடி": "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80", // Pottery/History
    "பெரியார்": "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80", // History/Book (Generic fallback for Periyar if no specific img)
    "பிளாஸ்டிக்": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", // Nature/Landscape
    "பருவநிலை": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", // Nature
};

export default function FixImages() {
    const [status, setStatus] = useState<"idle" | "working" | "success">("idle");
    const [log, setLog] = useState<string[]>([]);

    const fixImages = async () => {
        setStatus("working");
        setLog([]);
        try {
            const snap = await getDocs(collection(db, "articles"));
            let updatedCount = 0;

            for (const d of snap.docs) {
                const data = d.data();
                const title = data.title as string;

                // Find matching key
                const matchKey = Object.keys(FIX_MAP).find(key => title.includes(key));

                if (matchKey) {
                    const newImage = FIX_MAP[matchKey];
                    // Update only if different to save writes, or force update if broken
                    // We just force update to be safe
                    await updateDoc(doc(db, "articles", d.id), {
                        image: newImage,
                        imageUrl: newImage // Update both usages just in case
                    });
                    setLog(prev => [...prev, `✅ Updated: ${title.substring(0, 30)}...`]);
                    updatedCount++;
                } else {
                    setLog(prev => [...prev, `Skipped: ${title.substring(0, 30)}... (No match)`]);
                }
            }
            setLog(prev => [...prev, `DONE. Updated ${updatedCount} articles.`]);
            setStatus("success");
        } catch (e: any) {
            console.error(e);
            setLog(prev => [...prev, `ERROR: ${e.message}`]);
            setStatus("idle");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Fix Broken Article Images</h1>
            <p className="mb-6 text-neutral-600">
                This utility scans existing articles and replaces broken/placeholder URLs with known working Unsplash images based on the title.
            </p>

            <button
                onClick={fixImages}
                disabled={status === "working"}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
            >
                {status === "working" ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                Run Fixer
            </button>

            <div className="mt-8 bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-[400px] overflow-y-auto">
                {log.length === 0 ? "// Ready to start..." : log.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            {status === "success" && (
                <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Updates Complete. Please refresh your homepage.
                </div>
            )}
        </div>
    );
}
