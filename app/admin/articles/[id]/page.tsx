'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Article {
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    date: string;
}

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) {
            setError('No slug provided');
            setLoading(false);
            return;
        }

        async function fetchArticle() {
            try {
                // Replace with your API: /api/articles?slug=${slug} or /api/articles/${slug}
                const res = await fetch(`/api/articles?slug=${slug}`);
                if (!res.ok) throw new Error('Article not found');
                const data = await res.json();
                setArticle(data[0] || null);
            } catch (err: any) {
                setError(err.message || 'Failed to load article');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {article.title}
                </h1>
                <time className="text-gray-500 text-lg">{article.date}</time>
            </header>

            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-12 pt-12 border-t border-gray-200">
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    ← Back
                </button>
            </div>
        </article>
    );
}
