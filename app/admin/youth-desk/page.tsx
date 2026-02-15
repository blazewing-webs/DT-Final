"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Users, Loader2, Link as LinkIcon, Calendar } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface YouthDeskItem {
    id: string;
    title: string;
    description: string;
    link: string;
    createdAt: any;
}

export default function YouthDeskManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<YouthDeskItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newLink, setNewLink] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "youth_desk"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as YouthDeskItem[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching youth desk items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            await deleteDoc(doc(db, "youth_desk", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "youth_desk"), {
                title: newTitle,
                description: newDescription,
                link: newLink,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setNewTitle("");
            setNewDescription("");
            setNewLink("");
            fetchItems();
        } catch (error) {
            console.error("Error adding itme:", error);
            alert("Failed to add item");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-800">Youth Desk Management</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isAdding ? "Cancel" : "Add Post"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="font-bold text-lg mb-4">New Youth Desk Post</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Title / Event Name</label>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="e.g. Youth Leadership Workshop"
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Registration / Info Link</label>
                            <input
                                type="url"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="https://..."
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Details regarding the event or opportunity..."
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed">
                    <Users className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No youth desk posts yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200 relative">
                            <h3 className="font-bold text-neutral-900 mb-2 pr-8">{item.title}</h3>
                            <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{item.description}</p>

                            {item.link && (
                                <a href={item.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-dravida-red hover:underline flex items-center gap-1">
                                    Visit Link <LinkIcon size={14} />
                                </a>
                            )}

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-4 right-4 text-neutral-300 hover:text-red-600 transition-colors bg-neutral-50 rounded-full p-1.5"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
