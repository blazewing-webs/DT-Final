"use client";

import { useState } from "react";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function NewMagazinePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        month: "",
        coverUrl: "",
        pdfUrl: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "magazines"), {
                ...formData,
                createdAt: Timestamp.now()
            });
            router.push("/admin/magazines");
        } catch (error) {
            console.error("Error creating magazine:", error);
            alert("Failed to create magazine.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/magazines" className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold">Upload New Issue</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Magazine Title</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red text-lg font-bold"
                        placeholder="e.g. Dravida Thalaimurai - Feb 2026"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Month/Date */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Month / Edition Label</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                        placeholder="e.g. February 2026"
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    />
                </div>

                {/* Cover Image URL */}
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Cover Image URL</label>
                    <input
                        type="url"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                        placeholder="https://example.com/cover.jpg"
                        value={formData.coverUrl}
                        onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        Direct link to the cover image.
                    </p>
                </div>

                {/* PDF URL */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-dashed border-neutral-300">
                    <label className="block text-sm font-bold text-neutral-700 mb-2">PDF Document URL</label>
                    <div className="flex items-center gap-2 mb-2">
                        <Upload className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-600">Document Upload</span>
                    </div>
                    <input
                        type="url"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red bg-white"
                        placeholder="https://example.com/magazine-feb-2026.pdf"
                        value={formData.pdfUrl}
                        onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                        For now, please upload your PDF to a public host (like Google Drive, Dropbox, or a public bucket) and paste the link here.
                    </p>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-4 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Publish Issue
                    </button>
                </div>
            </form>
        </div>
    );
}
