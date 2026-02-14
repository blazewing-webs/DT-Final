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
            await addDoc(collection(db, "articles"), {
                ...data,
                date: Timestamp.now(),
                image: data.imageUrl // Ensure field matches Firestore schema
            });
            router.push("/admin/articles");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error creating article");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ArticleForm
            onSubmit={handleSubmit}
            loading={loading}
            titleText="Create New Article"
            buttonText="Publish Article"
        />
    );
}
