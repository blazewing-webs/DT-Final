"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Loader2, BookOpen, ExternalLink } from "lucide-react";

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
                                            <button
                                                onClick={() => handleDelete(mag.id)}
                                                className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
