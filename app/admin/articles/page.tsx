"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Edit, Trash2, Loader2, Eye } from "lucide-react";

interface Article {
    id: string;
    title: string;
    category: string;
    date: any;
    priority?: string;
}

export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const q = query(collection(db, "articles"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Article[];
            setArticles(data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "articles", id));
                setArticles(articles.filter(a => a.id !== id));
            } catch (error) {
                console.error("Error deleting article:", error);
                alert("Failed to delete.");
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Articles</h1>
                    <p className="text-neutral-500">Manage your news content.</p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="px-6 py-3 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create New Article
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center text-neutral-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500">
                        <p className="mb-4">No articles found.</p>
                        <Link href="/admin/articles/new" className="text-dravida-red font-bold hover:underline">
                            Create your first article
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-bold tracking-wider">
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Priority</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="p-4 font-bold text-neutral-900 max-w-xs truncate">
                                            {article.title}
                                        </td>
                                        <td className="p-4 text-sm text-neutral-600">
                                            <span className="bg-neutral-100 px-2 py-1 rounded text-xs font-bold uppercase">
                                                {article.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${article.priority?.includes("Breaking") ? "bg-red-100 text-red-700" :
                                                article.priority?.includes("Featured") ? "bg-blue-100 text-blue-700" :
                                                    "bg-gray-100 text-gray-700"
                                                }`}>
                                                {article.priority?.split(" ")[0] || "Standard"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-neutral-500">
                                            {article.date?.toDate ? new Date(article.date.toDate()).toLocaleDateString() : "Just now"}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/articles/${article.id}`}
                                                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </div>
    );
}
