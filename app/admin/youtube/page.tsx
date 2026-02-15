"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Loader2, Youtube, Edit, ExternalLink } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/components/admin/AuthContext";

interface YouTubeVideo {
    id: string;
    title: string;
    url: string;
    videoId: string;
    createdAt: any;
}

export default function YouTubeManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<YouTubeVideo | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        url: ""
    });

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as YouTubeVideo[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const extractVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleOpenModal = (item?: YouTubeVideo) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                url: item.url
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                url: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this video?")) return;
        try {
            await deleteDoc(doc(db, "youtube_videos", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const videoId = extractVideoId(formData.url);

        if (!videoId) {
            alert("Invalid YouTube URL");
            return;
        }

        try {
            if (editingItem) {
                // Update existing
                await updateDoc(doc(db, "youtube_videos", editingItem.id), {
                    title: formData.title,
                    url: formData.url,
                    videoId: videoId
                });
            } else {
                // Create new
                await addDoc(collection(db, "youtube_videos"), {
                    title: formData.title,
                    url: formData.url,
                    videoId: videoId,
                    createdAt: serverTimestamp()
                });
            }
            handleCloseModal();
            fetchItems();
        } catch (error) {
            console.error("Error saving video:", error);
            alert("Failed to save video");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">YouTube Videos</h1>
                    <p className="text-neutral-500 text-sm">Manage videos shown in the sidebar.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Video
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? "Edit Video" : "New Video"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Video Title</label>
                        <input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900"
                            placeholder="e.g. Interview with Leader"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">YouTube URL</label>
                        <input
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900"
                            placeholder="e.g. https://www.youtube.com/watch?v=..."
                            required
                        />
                        <p className="text-xs text-neutral-500 mt-1">Paste the full YouTube URL.</p>
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
                            {editingItem ? "Save Changes" : "Save Video"}
                        </button>
                    </div>
                </form>
            </Modal>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-xl border border-dotted border-neutral-300">
                    <Youtube className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500 mb-4">No videos found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group">
                            {/* Thumbnail Preview */}
                            <div className="aspect-video bg-neutral-100 relative">
                                <img
                                    src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors"
                                >
                                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-neutral-900 text-lg mb-1 line-clamp-2">{item.title}</h3>
                                <div className="flex justify-end gap-2 mt-4">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
