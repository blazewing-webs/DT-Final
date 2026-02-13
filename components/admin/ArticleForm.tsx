"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    { id: "politics", name: "அரசியல் (Politics)" },
    { id: "education", name: "கல்வி (Education)" },
    { id: "women", name: "பெண்கள் நலம் (Women)" },
    { id: "society", name: "சமூகம் (Society)" },
    { id: "history", name: "வரலாறு (History)" },
    { id: "environment", name: "சுற்றுச்சூழல் (Environment)" },
];

export interface ArticleData {
    title: string;
    category: string;
    author: string;
    imageUrl: string;
    priority: string;
    excerpt: string;
    content: string;
}

interface ArticleFormProps {
    initialData?: ArticleData;
    onSubmit: (data: ArticleData) => Promise<void>;
    loading: boolean;
    buttonText?: string;
    titleText?: string;
}

export default function ArticleForm({ initialData, onSubmit, loading, buttonText = "Publish Article", titleText = "Article" }: ArticleFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(initialData?.category || CATEGORIES[0].name);
    const [author, setAuthor] = useState(initialData?.author || "Admin");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [priority, setPriority] = useState(initialData?.priority || "Standard");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setExcerpt(initialData.excerpt);
            setContent(initialData.content);
            setCategory(initialData.category);
            setAuthor(initialData.author);
            setImageUrl(initialData.imageUrl);
            setPriority(initialData.priority);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            title,
            category,
            author,
            imageUrl,
            priority,
            excerpt,
            content
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/articles" className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold">{titleText}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Title (Tamil/English)</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red text-lg font-bold"
                        placeholder="Enter article title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">Category</label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">Author</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                            placeholder="Reporter Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>

                {/* Priority Selection */}
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Display Priority (Bento Grid)</label>
                    <div className="flex gap-4">
                        {["Breaking (Big)", "Featured (Medium)", "Standard (Small)"].map((p) => (
                            <label key={p} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={p}
                                    checked={priority === p}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="text-dravida-red focus:ring-dravida-red"
                                />
                                <span className="text-sm font-medium">{p}</span>
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                        * Breaking: Shows in the large main slot.<br />
                        * Featured: Shows in the wide medium slots.<br />
                        * Standard: Shows in small square slots.
                    </p>
                </div>

                {/* Image URL (No Storage) */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        Paste a direct link to an image (e.g., from Unsplash or another host).
                    </p>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Excerpt (Short Summary)</label>
                    <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                        placeholder="Short summary for the card..."
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                    />
                </div>

                {/* Full Content */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Full Content</label>
                    <textarea
                        rows={12}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red font-mono text-sm"
                        placeholder="Write your article content here (Markdown/HTML supported)..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-4 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {buttonText}
                    </button>
                </div>

            </form>
        </div>
    );
}
