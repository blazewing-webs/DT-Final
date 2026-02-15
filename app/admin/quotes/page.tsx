"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Quote, Loader2, Edit } from "lucide-react";
import Modal from "@/components/ui/Modal";
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

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<QuoteItem | null>(null);
    const [formData, setFormData] = useState({
        text: "",
        author: ""
    });

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

    const handleOpenModal = (item?: QuoteItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                text: item.text,
                author: item.author
            });
        } else {
            setEditingItem(null);
            setFormData({
                text: "",
                author: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                // Update existing
                await updateDoc(doc(db, "quotes", editingItem.id), {
                    text: formData.text,
                    author: formData.author
                });
            } else {
                // Create new
                await addDoc(collection(db, "quotes"), {
                    text: formData.text,
                    author: formData.author,
                    createdAt: serverTimestamp()
                });
            }
            handleCloseModal();
            fetchItems();
        } catch (error) {
            console.error("Error saving quote:", error);
            alert("Failed to save quote");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">Quote Management</h1>
                    <p className="text-neutral-500 text-sm">Manage dynamic quotes.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Quote
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? "Edit Quote" : "New Quote"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Quote Text</label>
                        <textarea
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            placeholder="Enter the quote here..."
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Author / Source</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="e.g. Thanthai Periyar"
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            required
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="mr-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                        >
                            {editingItem ? "Save Changes" : "Save Quote"}
                        </button>
                    </div>
                </form>
            </Modal>

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
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 relative group">
                            <Quote className="w-8 h-8 text-neutral-200 absolute top-4 left-4" />
                            <blockquote className="pl-12 pr-12 relative z-10">
                                <p className="text-lg font-medium text-neutral-900 mb-2">"{item.text}"</p>
                                <footer className="text-sm font-bold text-dravida-red">– {item.author}</footer>
                            </blockquote>

                            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="p-1.5 text-neutral-400 hover:text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 bg-white rounded-full hover:bg-red-50 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
