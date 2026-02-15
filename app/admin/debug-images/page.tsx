"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DebugImages() {
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const snap = await getDocs(collection(db, "articles"));
            setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetch();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Image Debugger</h1>
            <div className="space-y-4">
                {articles.map(a => (
                    <div key={a.id} className="border p-4 rounded flex gap-4">
                        <div className="w-32 h-20 bg-gray-100 flex-shrink-0 relative">
                            {a.image ? (
                                <img src={a.image} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-red-500 text-xs p-2">No Image Field</div>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h3 className="font-bold">{a.title}</h3>
                            <p className="text-sm font-mono truncate bg-gray-50 p-1 mt-1 border">
                                {a.image || "UNDEFINED"}
                            </p>
                            <a href={a.image} target="_blank" className="text-blue-600 underline text-sm">Open Link</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
