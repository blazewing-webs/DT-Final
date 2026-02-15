"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Book, Loader2, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface BookItem {
    id: string;
    title: string;
    author: string;
    description: string;
    coverUrl: string;
    buyLink: string;
    createdAt: any;
}

export default function BookManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCoverUrl, setNewCoverUrl] = useState("");
    const [newBuyLink, setNewBuyLink] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BookItem[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return;
        try {
            await deleteDoc(doc(db, "books", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("Failed to delete book");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "books"), {
                title: newTitle,
                author: newAuthor,
                description: newDescription,
                coverUrl: newCoverUrl,
                buyLink: newBuyLink,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setNewTitle("");
            setNewAuthor("");
            setNewDescription("");
            setNewCoverUrl("");
            setNewBuyLink("");
            fetchItems();
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-800">Book Management</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isAdding ? "Cancel" : "Add Book"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="font-bold text-lg mb-4">Add New Book</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Book Title"
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    value={newAuthor}
                                    onChange={(e) => setNewAuthor(e.target.value)}
                                    placeholder="Author Name"
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Cover Image URL</label>
                                <input
                                    type="url"
                                    value={newCoverUrl}
                                    onChange={(e) => setNewCoverUrl(e.target.value)}
                                    placeholder="https://example.com/cover.jpg"
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Buy / Read Link</label>
                                <input
                                    type="url"
                                    value={newBuyLink}
                                    onChange={(e) => setNewBuyLink(e.target.value)}
                                    placeholder="https://amazon.com/..."
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Short description about the book..."
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Add Book
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
                    <Book className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No books added yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex gap-4 relative group">
                            <div className="w-20 h-28 bg-neutral-100 rounded shrink-0 overflow-hidden">
                                {item.coverUrl ? (
                                    <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-300">
                                        <Book size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-neutral-900 line-clamp-1">{item.title}</h3>
                                <p className="text-xs text-neutral-500 mb-2">{item.author}</p>
                                <p className="text-xs text-neutral-600 line-clamp-2 mb-2">{item.description}</p>
                                {item.buyLink && (
                                    <a href={item.buyLink} target="_blank" rel="noreferrer" className="text-xs text-dravida-red hover:underline flex items-center gap-1">
                                        View Link <LinkIcon size={10} />
                                    </a>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-2 right-2 text-neutral-300 hover:text-red-600 transition-colors bg-white rounded-full p-1"
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
