"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RecursiveTimeline from "./RecursiveTimeline";

interface TimelineItem {
    id: string;
    time: string;
    title: string;
    description?: string;
    children?: TimelineItem[];
}

export default function LiveTimeline() {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener
        const q = query(
            collection(db, "timelines"),
            orderBy("createdAt", "desc"),
            limit(10)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TimelineItem[];
            setItems(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching timeline:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="animate-pulse bg-neutral-100 h-64 rounded-xl"></div>;

    if (items.length === 0) return null; // Don't show if empty

    return (
        <RecursiveTimeline
            title="Live Updates: Coonoor"
            items={items}
            className="w-full"
        />
    );
}
