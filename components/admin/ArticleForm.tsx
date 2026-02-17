"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { compressImage } from "@/lib/imageUtils";

// Fallback if DB is empty
const DEFAULT_CATEGORIES = [
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
    const [category, setCategory] = useState(initialData?.category || "");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [priority, setPriority] = useState(initialData?.priority || "Standard");

    const [categories, setCategories] = useState<{ id: string, name: string }[]>(DEFAULT_CATEGORIES);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, "categories"), orderBy("slug", "asc"));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const fetchedCats = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        name: doc.data().name as string
                    }));
                    setCategories(fetchedCats);

                    // Set default category if not set and we have fetched ones
                    if (!category && !initialData?.category) {
                        setCategory(fetchedCats[0].name);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setExcerpt(initialData.excerpt);
            setContent(initialData.content);
            setCategory(initialData.category);
            setImageUrl(initialData.imageUrl);
            setPriority(initialData.priority);
        } else if (!category && categories.length > 0) {
            // Ensure default category is selected on new article
            setCategory(categories[0].name);
        }
    }, [initialData, categories]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await compressImage(file);
            setImageUrl(base64);
            // Reset input value to allow re-upload if needed
            e.target.value = "";
        } catch (error) {
            console.error("Image processing error:", error);
            alert("Failed to process image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            title,
            category: category || categories[0]?.name || "Uncategorized", // Safety fallback
            author: "Team", // Hardcoded as per request to remove field
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
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
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

                {/* Image URL / Upload */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Cover Image (Upload or URL)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red bg-neutral-50 text-sm font-mono truncate"
                            placeholder="https://... or Upload Image"
                            value={imageUrl.startsWith('data:') ? 'Image Data (Base64)' : imageUrl}
                            onChange={(e) => !imageUrl.startsWith('data:') && setImageUrl(e.target.value)}
                            disabled={imageUrl.startsWith('data:')}
                        />
                        <label className="flex items-center justify-center px-6 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg cursor-pointer transition-colors whitespace-nowrap min-w-[140px]">
                            <Upload className="w-5 h-5 mr-2 text-neutral-600" />
                            <span className="text-sm font-bold text-neutral-700">Upload</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                        {imageUrl && (
                            <button
                                type="button"
                                onClick={() => setImageUrl("")}
                                className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-bold text-sm"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {imageUrl && (
                        <div className="mt-4 relative w-full h-64 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-bold">Preview</p>
                            </div>
                        </div>
                    )}
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
