'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    published: boolean;
}

export default function ArticlePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        async function fetchArticle() {
            try {
                // Replace with your API endpoint, e.g., /api/articles/${id}
                const res = await fetch(`/api/articles/${id}`);
                if (!res.ok) throw new Error('Article not found');
                const data = await res.json();
                setArticle(data);
            } catch (err) {
                setError('Failed to load article');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    if (loading) return <div className="p-8">Loading article...</div>;
    if (error || !article) return (
        <div className="p-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-red-600">{error || 'Article not found'}</h1>
            <button onClick={() => router.push('/admin/articles')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Back to Articles
            </button>
        </div>
    );

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <div className="space-x-2">
                    <button
                        onClick={() => router.push(`/admin/articles/${id}/edit`)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Published:</strong> {article.published ? 'Yes' : 'No'}</p>
                <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
        </div>
    );
}
