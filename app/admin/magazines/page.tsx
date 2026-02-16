"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Plus, Trash2, Loader2, BookOpen, ExternalLink, Edit, X, Save, Upload } from "lucide-react";

interface Magazine {
    id: string;
    title: string;
    month: string;
    coverUrl: string;
    pdfUrl: string;
    createdAt: any;
}

export default function MagazinesListPage() {
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingMagazine, setEditingMagazine] = useState<Magazine | null>(null);
    const [updating, setUpdating] = useState(false);
    const [uploadingField, setUploadingField] = useState<'cover' | 'pdf' | null>(null);

    useEffect(() => {
        fetchMagazines();
    }, []);

    const fetchMagazines = async () => {
        try {
            const q = query(collection(db, "magazines"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Magazine[];
            setMagazines(data);
        } catch (error) {
            console.error("Error fetching magazines:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this magazine?")) {
            try {
                await deleteDoc(doc(db, "magazines", id));
                setMagazines(magazines.filter(m => m.id !== id));
            } catch (error) {
                console.error("Error deleting magazine:", error);
                alert("Failed to delete.");
            }
        }
    };

    const handleEdit = (magazine: Magazine) => {
        setEditingMagazine({ ...magazine });
    };

    const handleFileUpload = async (file: File | null, type: 'cover' | 'pdf') => {
        if (!file || !editingMagazine) return;
        setUploadingField(type);
        try {
            console.log(`Starting upload for ${type}: ${file.name}`);
            const path = `magazines/${Date.now()}_${file.name}`;
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            console.log("Upload complete, getting URL...");
            const url = await getDownloadURL(storageRef);
            console.log("URL retrieved:", url);

            setEditingMagazine(prev => prev ? ({
                ...prev,
                [type === 'cover' ? 'coverUrl' : 'pdfUrl']: url
            }) : null);

            alert(`${type === 'cover' ? 'Cover image' : 'PDF'} uploaded successfully!`);
        } catch (error: any) {
            console.error("Upload error details:", error);
            // Show more specific error to user
            const message = error?.message || "Unknown error";
            if (message.includes("unauthorized")) {
                alert("Upload failed: Permission denied. Please check your login status.");
            } else {
                alert(`Upload failed: ${message}`);
            }
        } finally {
            setUploadingField(null);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMagazine) return;

        setUpdating(true);
        try {
            const magRef = doc(db, "magazines", editingMagazine.id);
            await updateDoc(magRef, {
                title: editingMagazine.title,
                month: editingMagazine.month,
                coverUrl: editingMagazine.coverUrl,
                pdfUrl: editingMagazine.pdfUrl
            });

            // Update local state
            setMagazines(magazines.map(m => m.id === editingMagazine.id ? editingMagazine : m));
            setEditingMagazine(null);
            alert("Magazine updated successfully!");
        } catch (error) {
            console.error("Error updating magazine:", error);
            alert("Failed to update magazine.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Magazines</h1>
                    <p className="text-neutral-500">Manage monthly issues and documents.</p>
                </div>
                <Link
                    href="/admin/magazines/new"
                    className="px-6 py-3 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Upload New Issue
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center text-neutral-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : magazines.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
                        <p className="mb-4">No magazines found.</p>
                        <Link href="/admin/magazines/new" className="text-dravida-red font-bold hover:underline">
                            Upload your first issue
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-bold">
                                <tr>
                                    <th className="p-4">Cover</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Month/Date</th>
                                    <th className="p-4">PDF</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {magazines.map((mag) => (
                                    <tr key={mag.id} className="hover:bg-neutral-50">
                                        <td className="p-4">
                                            <div className="w-12 h-16 bg-neutral-200 rounded overflow-hidden relative">
                                                {mag.coverUrl ? (
                                                    <img src={mag.coverUrl} alt={mag.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-neutral-400">
                                                        <BookOpen className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-neutral-900">{mag.title}</td>
                                        <td className="p-4 text-sm text-neutral-600">{mag.month}</td>
                                        <td className="p-4">
                                            {mag.pdfUrl ? (
                                                <a
                                                    href={mag.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                                                >
                                                    View PDF <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span className="text-neutral-400 text-sm">No PDF</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(mag)}
                                                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(mag.id)}
                                                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingMagazine && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Edit Magazine</h2>
                            <button
                                onClick={() => setEditingMagazine(null)}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-neutral-500" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={editingMagazine.title}
                                    onChange={(e) => setEditingMagazine({ ...editingMagazine, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">Month / Edition</label>
                                <input
                                    type="text"
                                    required
                                    value={editingMagazine.month}
                                    onChange={(e) => setEditingMagazine({ ...editingMagazine, month: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">Cover Image URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        required
                                        value={editingMagazine.coverUrl}
                                        onChange={(e) => setEditingMagazine({ ...editingMagazine, coverUrl: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                                    />
                                    <label className="flex items-center justify-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg cursor-pointer transition-colors">
                                        {uploadingField === 'cover' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 text-neutral-600" />}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            disabled={!!uploadingField}
                                            onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'cover')}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">PDF URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        required
                                        value={editingMagazine.pdfUrl}
                                        onChange={(e) => setEditingMagazine({ ...editingMagazine, pdfUrl: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red"
                                    />
                                    <label className="flex items-center justify-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg cursor-pointer transition-colors">
                                        {uploadingField === 'pdf' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 text-neutral-600" />}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"
                                            disabled={!!uploadingField}
                                            onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'pdf')}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingMagazine(null)}
                                    className="px-4 py-2 text-neutral-600 font-bold hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating || !!uploadingField}
                                    className="px-6 py-2 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
