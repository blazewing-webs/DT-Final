"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    image: string;
    priority: string;
    date: string; // Converted to string for easier frontend handling
    tags: string[];
}

export function useArticles(category?: string, articleLimit: number = 10, priority?: string) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                let q = query(
                    collection(db, "articles"),
                    orderBy("date", "desc"),
                    limit(articleLimit)
                );

                if (category) {
                    q = query(
                        collection(db, "articles"),
                        where("category", "==", category),
                        limit(articleLimit)
                    );
                } else if (priority) {
                    q = query(
                        collection(db, "articles"),
                        where("priority", "==", priority),
                        limit(articleLimit)
                    );
                }

                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        ...docData,
                        date: docData.date instanceof Timestamp
                            ? new Date(docData.date.toDate()).toLocaleDateString("en-IN", {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })
                            : "Just now",
                        // Keep raw date for sorting if needed, but here we sort mapping
                        rawDate: docData.date // We might need this for sorting
                    };
                }) as any[];

                // Client-side sort because we removed orderBy in category query
                data.sort((a, b) => {
                    const dateA = a.rawDate instanceof Timestamp ? a.rawDate.toMillis() : 0;
                    const dateB = b.rawDate instanceof Timestamp ? b.rawDate.toMillis() : 0;
                    return dateB - dateA;
                });

                setArticles(data);
            } catch (err: any) {
                console.error("Error fetching articles:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [category, articleLimit, priority]);

    return { articles, loading, error };
}
