"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp, Timestamp, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Quote, Loader2, Edit, Calendar, Clock, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/components/admin/AuthContext";

interface QuoteItem {
    id: string;
    text: string;
    author: string;
    startTime: Timestamp;
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
            // Order by startTime descending to see newest scheduled items first
            const q = query(collection(db, "quotes"), orderBy("startTime", "desc"));
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

    // Delete Confirmation State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const confirmDelete = (id: string) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteDoc(doc(db, "quotes", itemToDelete));
            setItems(items.filter(item => item.id !== itemToDelete));
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
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
                // Create new with Queue Logic
                const q = query(collection(db, "quotes"), orderBy("startTime", "desc"), limit(1));
                const snap = await getDocs(q);

                let newStartTime = new Date(); // Default: Start Now

                if (!snap.empty) {
                    const lastQuote = snap.docs[0].data() as QuoteItem;
                    const lastEndTime = lastQuote.startTime.toDate().getTime() + (24 * 60 * 60 * 1000); // +24h

                    if (lastEndTime > Date.now()) {
                        newStartTime = new Date(lastEndTime);
                    }
                }

                await addDoc(collection(db, "quotes"), {
                    text: formData.text,
                    author: formData.author,
                    startTime: Timestamp.fromDate(newStartTime),
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

    // Helper to determine status
    const getStatus = (startTime: Timestamp) => {
        const start = startTime.toDate().getTime();
        const end = start + (24 * 60 * 60 * 1000);
        const now = Date.now();

        if (now >= start && now < end) return "active";
        if (now < start) return "queued";
        return "expired";
    };

    const formatTime = (date: Date) => {
        return date.toLocaleString('en-IN', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">Quote Management</h1>
                    <p className="text-neutral-500 text-sm">Manage dynamic daily quotes (Queue System).</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Quote to Queue
                </button>
            </div>

            {/* Edit/Create Modal */}
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

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div className="space-y-4">
                    <p className="text-neutral-600">Are you sure you want to delete this quote? This action cannot be undone.</p>
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="mr-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                </div>
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
                    {items.map((item) => {
                        const status = item.startTime ? getStatus(item.startTime) : 'expired'; // Fallback for old items
                        const startTime = item.startTime?.toDate();
                        const endTime = startTime ? new Date(startTime.getTime() + (24 * 60 * 60 * 1000)) : null;

                        return (
                            <div key={item.id} className={`p-6 rounded-xl shadow-sm border transition-colors relative group
                                ${status === 'active' ? 'bg-green-50 border-green-200' :
                                    status === 'queued' ? 'bg-blue-50 border-blue-200' :
                                        'bg-white border-neutral-200 opacity-75'}`}>

                                {/* Header: Status and Actions */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-full ${status === 'active' ? 'bg-green-100' : 'bg-neutral-100'}`}>
                                            <Quote className={`w-5 h-5 ${status === 'active' ? 'text-green-600' : 'text-neutral-400'}`} />
                                        </div>
                                        {status === 'active' && (
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Active Now
                                            </span>
                                        )}
                                        {status === 'queued' && (
                                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> Queued
                                            </span>
                                        )}
                                        {status === 'expired' && (
                                            <span className="bg-neutral-100 text-neutral-500 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> Expired
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="p-2 text-neutral-500 hover:text-blue-600 bg-white border border-neutral-200 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                                            title="Edit"
                                            disabled={status === 'expired'}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(item.id)}
                                            className="p-2 text-neutral-500 hover:text-red-600 bg-white border border-neutral-200 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="pl-2">
                                    <blockquote className="mb-3">
                                        <p className="text-lg font-medium text-neutral-900 mb-2">"{item.text}"</p>
                                        <footer className="text-sm font-bold text-dravida-red">– {item.author}</footer>
                                    </blockquote>

                                    {/* Timing Info */}
                                    {startTime && endTime && (
                                        <div className="flex flex-wrap text-xs text-neutral-500 gap-4 mt-4 pt-4 border-t border-neutral-200/50">
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold text-neutral-400 uppercase">Starts:</span>
                                                {formatTime(startTime)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold text-neutral-400 uppercase">Ends:</span>
                                                {formatTime(endTime)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
