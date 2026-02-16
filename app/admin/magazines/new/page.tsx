"use client";

import { useState } from "react";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export default function NewMagazinePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        month: "",
        coverUrl: "",
        pdfUrl: "",
    });

    const handleFileUpload = async (file: File | null, type: 'cover' | 'pdf') => {
        if (!file) return;
        setLoading(true);
        try {
            const path = `magazines/${Date.now()}_${file.name}`;
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            setFormData(prev => ({
                ...prev,
                [type === 'cover' ? 'coverUrl' : 'pdfUrl']: url
            }));

            alert(`${type === 'cover' ? 'Cover image' : 'PDF'} uploaded successfully!`);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                    <div className="flex gap-2">
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                            placeholder="https://example.com/cover.jpg"
                            value={formData.coverUrl}
                            onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                        />
                        <label className="flex items-center justify-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg cursor-pointer transition-colors">
                            <Upload className="w-5 h-5 text-neutral-600" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'cover')}
                            />
                        </label>
                    </div>
                </div>

                {/* PDF URL */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-dashed border-neutral-300">
                    <label className="block text-sm font-bold text-neutral-700 mb-2">PDF Document URL</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red bg-white"
                            placeholder="https://example.com/magazine-feb-2026.pdf"
                            value={formData.pdfUrl}
                            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                        />
                        <label className="flex items-center justify-center px-4 py-2 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg cursor-pointer transition-colors">
                            <Upload className="w-5 h-5 text-neutral-600" />
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'pdf')}
                            />
                        </label>
                    </div>
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
