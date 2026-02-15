"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Clock, Loader2, Edit } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { useAuth } from "@/components/admin/AuthContext";

interface TimelineItem {
    id: string;
    time: string; // "10:30 AM" or similar
    title: string;
    description: string;
    createdAt: any;
}

export default function TimelineManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
    const [formData, setFormData] = useState({
        time: "",
        title: "",
        description: ""
    });

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "timelines"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TimelineItem[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching timeline:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleOpenModal = (item?: TimelineItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                time: item.time,
                title: item.title,
                description: item.description
            });
        } else {
            setEditingItem(null);
            setFormData({
                time: "",
                title: "",
                description: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this update?")) return;
        try {
            await deleteDoc(doc(db, "timelines", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting timeline:", error);
            alert("Failed to delete update");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                // Update existing
                await updateDoc(doc(db, "timelines", editingItem.id), {
                    time: formData.time,
                    title: formData.title,
                    description: formData.description,
                });
            } else {
                // Create new
                await addDoc(collection(db, "timelines"), {
                    time: formData.time,
                    title: formData.title,
                    description: formData.description,
                    createdAt: serverTimestamp()
                });
            }
            handleCloseModal();
            fetchItems();
        } catch (error) {
            console.error("Error saving timeline:", error);
            alert("Failed to save update");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">Live Timeline</h1>
                    <p className="text-neutral-500 text-sm">Manage real-time updates for the homepage.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Update
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? "Edit Timeline Update" : "New Timeline Update"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Time Label</label>
                        <input
                            type="text"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            placeholder="e.g. 10:30 AM"
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Brief headline..."
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed update..."
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
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
                            {editingItem ? "Save Changes" : "Post Update"}
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
                    <Clock className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No updates yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex flex-col md:flex-row gap-4 items-start md:items-center group">
                            <div className="min-w-[100px] text-sm font-bold text-dravida-red bg-red-50 px-3 py-1 rounded-full text-center">
                                {item.time}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-neutral-900">{item.title}</h3>
                                <p className="text-sm text-neutral-600">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
