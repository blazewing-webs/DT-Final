"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ArticleForm, { ArticleData } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: ArticleData) => {
        setLoading(true);

        try {
            // Use provided URL or default
            const finalImageUrl = data.imageUrl || "https://images.unsplash.com/photo-1508614589041-895b8c9d7efb?auto=format&fit=crop&q=80&w=1000";

            // Create Slug (Simple version)
            const slug = `${Date.now()}`;

            // Save to Firestore
            await addDoc(collection(db, "articles"), {
                title: data.title,
                slug,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                author: data.author,
                image: finalImageUrl,
                priority: data.priority,
                date: Timestamp.now(),
                tags: [],
                views: 0
            });

            // Redirect
            router.push("/admin/articles");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error saving article. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ArticleForm
            onSubmit={handleSubmit}
            loading={loading}
            titleText="New Article"
            buttonText="Publish Article"
        />
    );
}
