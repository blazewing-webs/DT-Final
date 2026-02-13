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

export function useArticles(category?: string, articleLimit: number = 10) {
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
                        orderBy("date", "desc"),
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
                            : "Just now"
                    };
                }) as Article[];

                setArticles(data);
            } catch (err: any) {
                console.error("Error fetching articles:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [category, articleLimit]);

    return { articles, loading, error };
}
