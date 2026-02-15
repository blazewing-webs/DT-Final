"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Loader2, Save } from "lucide-react";

interface Category {
    id: string;
    name: string; // Display name e.g., "அரசியல் (Politics)" or just "Politics"
    slug: string; // e.g., "politics"
    createdAt?: any;
}

// Initial seed data
const INITIAL_CATEGORIES = [
    { slug: "politics", name: "அரசியல் (Politics)" },
    { slug: "education", name: "கல்வி (Education)" },
    { slug: "women", name: "பெண்கள் நலம் (Women)" },
    { slug: "society", name: "சமூகம் (Society)" },
    { slug: "history", name: "வரலாறு (History)" },
    { slug: "environment", name: "சுற்றுச்சூழல் (Environment)" },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const q = query(collection(db, "categories"), orderBy("slug", "asc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Category[];
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName || !newCategorySlug) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "categories"), {
                name: newCategoryName,
                slug: newCategorySlug.toLowerCase(),
                createdAt: Timestamp.now()
            });
            setNewCategoryName("");
            setNewCategorySlug("");
            fetchCategories(); // Refresh list
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteDoc(doc(db, "categories", id));
                setCategories(categories.filter(c => c.id !== id));
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Failed to delete");
            }
        }
    };

    const seedCategories = async () => {
        if (!confirm("This will add default categories. Continue?")) return;
        setIsSubmitting(true);
        try {
            for (const cat of INITIAL_CATEGORIES) {
                await addDoc(collection(db, "categories"), {
                    name: cat.name,
                    slug: cat.slug,
                    createdAt: Timestamp.now()
                });
            }
            fetchCategories();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Category Management</h1>

            {/* Add Category Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8">
                <h2 className="text-lg font-bold mb-4">Add New Category</h2>
                <form onSubmit={handleAddCategory} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Tamil Name (English)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Slug (ID)</label>
                        <input
                            type="text"
                            placeholder="e.g. politics"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={newCategorySlug}
                            onChange={(e) => setNewCategorySlug(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 h-[42px]"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Add
                    </button>
                </form>
            </div>

            {/* Category List */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500">
                        <p className="mb-4">No categories found.</p>
                        <button onClick={seedCategories} className="text-dravida-red font-bold hover:underline">
                            Seed Default Categories
                        </button>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-bold">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-neutral-50">
                                    <td className="p-4 font-bold">{cat.name}</td>
                                    <td className="p-4 text-neutral-500 font-mono text-sm">{cat.slug}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="text-neutral-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
