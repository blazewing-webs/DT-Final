"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Quote, Loader2 } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface QuoteItem {
    id: string;
    text: string;
    author: string;
    createdAt: any;
}

export default function QuoteManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<QuoteItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newText, setNewText] = useState("");
    const [newAuthor, setNewAuthor] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as QuoteItem[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this quote?")) return;
        try {
            await deleteDoc(doc(db, "quotes", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting quote:", error);
            alert("Failed to delete quote");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "quotes"), {
                text: newText,
                author: newAuthor,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setNewText("");
            setNewAuthor("");
            fetchItems();
        } catch (error) {
            console.error("Error adding quote:", error);
            alert("Failed to add quote");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-800">Quote Management</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isAdding ? "Cancel" : "Add Quote"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="font-bold text-lg mb-4">New Quote</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Quote Text</label>
                            <textarea
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                placeholder="Enter the quote here..."
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Author / Source</label>
                            <input
                                type="text"
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                                placeholder="e.g. Thanthai Periyar"
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Add Quote
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
                    <Quote className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No quotes added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 relative">
                            <Quote className="w-8 h-8 text-neutral-200 absolute top-4 left-4" />
                            <blockquote className="pl-12 pr-8 relative z-10">
                                <p className="text-lg font-medium text-neutral-900 mb-2">"{item.text}"</p>
                                <footer className="text-sm font-bold text-dravida-red">– {item.author}</footer>
                            </blockquote>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-4 right-4 text-neutral-300 hover:text-red-600 transition-colors bg-white rounded-full p-1.5"
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
