"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ArticleForm, { ArticleData } from "@/components/admin/ArticleForm";
import { Loader2 } from "lucide-react";

function EditArticleContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<ArticleData | undefined>(undefined);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setInitialData({
                        title: data.title,
                        category: data.category,
                        author: data.author,
                        imageUrl: data.image,
                        priority: data.priority,
                        excerpt: data.excerpt,
                        content: data.content
                    });
                } else {
                    setError("Article not found");
                }
            } catch (error) {
                console.error("Error fetching article:", error);
                setError("Error loading article");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        } else {
            setLoading(false);
            setError("No article ID provided");
        }
    }, [id]);

    const handleSubmit = async (data: ArticleData) => {
        if (!id) return;

        setLoading(true);
        try {
            const docRef = doc(db, "articles", id);
            // Generate slug from title if it doesn't exist or if title changed (optional, but good for consistency)
            // For now, let's just ensure we have a slug if it's missing, or update it to match new title
            const slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const finalSlug = slug || `article-${Date.now()}`;

            await updateDoc(docRef, {
                title: data.title,
                slug: finalSlug, // Update slug
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                author: data.author,
                image: data.imageUrl,
                priority: data.priority,
                updatedAt: Timestamp.now()
            });

            router.push("/admin/articles");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error updating article");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-dravida-red" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => router.push("/admin/articles")}
                    className="text-blue-600 hover:underline"
                >
                    Back to Articles
                </button>
            </div>
        );
    }

    return (
        <ArticleForm
            initialData={initialData}
            onSubmit={handleSubmit}
            loading={loading}
            titleText="Edit Article"
            buttonText="Update Article"
        />
    );
}

export default function EditArticlePage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-dravida-red" /></div>}>
            <EditArticleContent />
        </Suspense>
    );
}
