"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ArticleForm, { ArticleData } from "@/components/admin/ArticleForm";
import { Loader2 } from "lucide-react";

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<ArticleData | undefined>(undefined);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setInitialData({
                        title: data.title,
                        category: data.category,
                        author: data.author,
                        imageUrl: data.image, // Note: field name in db is 'image'
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
        }
    }, [id]);

    const handleSubmit = async (data: ArticleData) => {
        setLoading(true);
        try {
            const docRef = doc(db, "articles", id);
            await updateDoc(docRef, {
                title: data.title,
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
