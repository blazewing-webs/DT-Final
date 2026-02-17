"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Users, Loader2, Edit, Save, X, Upload } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/components/admin/AuthContext";
import { compressImage } from "@/lib/imageUtils";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    createdAt: any;
}

export default function TeamManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        imageUrl: ""
    });

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "team_members"), orderBy("createdAt", "asc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TeamMember[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching team members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleOpenModal = (item?: TeamMember) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                role: item.role,
                bio: item.bio,
                imageUrl: item.imageUrl
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                role: "",
                bio: "",
                imageUrl: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;
        try {
            await deleteDoc(doc(db, "team_members", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting member:", error);
            alert("Failed to delete member");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await compressImage(file, 400); // Optimize for team avatars
            setFormData(prev => ({ ...prev, imageUrl: base64 }));
            e.target.value = "";
        } catch (error) {
            console.error("Image processing error:", error);
            alert("Failed to process image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                // Update existing
                await updateDoc(doc(db, "team_members", editingItem.id), {
                    name: formData.name,
                    role: formData.role,
                    bio: formData.bio,
                    imageUrl: formData.imageUrl
                });
            } else {
                // Create new
                await addDoc(collection(db, "team_members"), {
                    name: formData.name,
                    role: formData.role,
                    bio: formData.bio,
                    imageUrl: formData.imageUrl,
                    createdAt: serverTimestamp()
                });
            }
            handleCloseModal();
            fetchItems();
        } catch (error) {
            console.error("Error saving team member:", error);
            alert("Failed to save team member");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">Team Management</h1>
                    <p className="text-neutral-500 text-sm">Manage editors, reporters, and contributors.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Member
                </button>
            </div>

            {/* Edit/Create Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? "Edit Team Member" : "Add Team Member"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. K. Veeramani"
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Role / Designation</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g. Editor-in-Chief"
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Profile Image</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.imageUrl.startsWith('data:') ? 'Image Data (Base64)' : formData.imageUrl}
                                placeholder="No image selected"
                                className="w-full p-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-500 cursor-not-allowed text-sm"
                                readOnly
                            />
                            <label className="flex items-center justify-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                                <Upload className="w-5 h-5 mr-2 text-neutral-600" />
                                <span className="text-sm font-medium">Upload</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                            {formData.imageUrl && (
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                                    title="Remove Image"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {/* Preview */}
                        {formData.imageUrl && (
                            <div className="mt-3 text-center">
                                <div className="inline-block w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md relative bg-neutral-100">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-xs text-neutral-500 mt-1">Preview</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Short Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Brief description about the person..."
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
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
                            {editingItem ? "Save Changes" : "Add Member"}
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
                    <Users className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No team members added yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-neutral-100 mb-4 overflow-hidden border-2 border-neutral-100">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-100">
                                        <Users className="w-10 h-10" />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-lg text-neutral-900">{item.name}</h3>
                            <p className="text-sm font-bold text-dravida-red mb-2 uppercase tracking-wide">{item.role}</p>
                            <p className="text-sm text-neutral-600 line-clamp-3">{item.bio}</p>

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="p-1.5 text-neutral-400 hover:text-blue-600 bg-white rounded-full shadow-sm hover:shadow-md transition-all border border-neutral-100"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 bg-white rounded-full shadow-sm hover:shadow-md transition-all border border-neutral-100"
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
