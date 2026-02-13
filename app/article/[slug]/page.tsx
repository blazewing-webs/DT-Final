"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Loader2, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// Interface for Article (should match what we saved)
interface Article {
    id: string;
    title: string;
    content: string; // HTML/Markdown
    image: string;
    category: string;
    author: string;
    date: any; // Timestamp
    slug: string;
}

export default function ArticlePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;
            try {
                // Query Firestore by slug
                const q = query(
                    collection(db, "articles"),
                    where("slug", "==", slug),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError("Article not found.");
                    setLoading(false);
                    return;
                }

                // Get the first match
                const doc = querySnapshot.docs[0];
                setArticle({ id: doc.id, ...doc.data() } as Article);
            } catch (err) {
                console.error("Error fetching article:", err);
                setError("Failed to load article.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 gap-4">
                <p className="text-xl text-neutral-600">{error || "Article not found"}</p>
                <Link href="/" className="text-dravida-red hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    // Format Date
    const dateString = article.date?.seconds
        ? new Date(article.date.seconds * 1000).toLocaleDateString("ta-IN", { year: 'numeric', month: 'long', day: 'numeric' })
        : "N/A";

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-dravida-red font-bold mb-4 uppercase tracking-wider">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span className="text-neutral-500">{article.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-neutral-600 text-sm border-b border-neutral-200 pb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{dateString}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {article.image && (
                    <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-dravida-red hover:prose-a:text-black prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

            </article>

            <Footer />
        </main>
    );
}
