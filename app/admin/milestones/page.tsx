"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Loader2, Save } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface Milestone {
    id: string;
    year: string;
    title: string;
    desc: string;
    createdAt: any;
}

const DEFAULT_MILESTONES = [
    { year: "1925", title: "சுயமரியாதை இயக்கம்", desc: "தந்தை பெரியாரால் தோற்றுவிக்கப்பட்டது." },
    { year: "1949", title: "திராவிட முன்னேற்றக் கழகம்", desc: "பேரறிஞர் அண்ணாவால் துவக்கம்." },
    { year: "1967", title: "சமூக நீதிக்கு அரசியல் வெற்றி", desc: "மாநிலத்தில் ஆட்சி மாற்றம், சமூக நீதி நிலைநாட்டப்பட்டது." },
    { year: "2000+", title: "இளம் தலைமுறை விழிப்புணர்வு", desc: "இணையம் வழி திராவிடக் கொள்கை பரவல்." },
];

export default function MilestonesManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form inputs
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            // Sort by year string (simple alphanumeric sort) or createdAt
            const q = query(collection(db, "milestones"), orderBy("year", "asc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Milestone[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching milestones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "milestones"), {
                year,
                title,
                desc,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            resetForm();
            fetchItems();
        } catch (error) {
            console.error("Error adding milestone:", error);
            alert("Failed to add milestone");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this milestone?")) return;
        try {
            await deleteDoc(doc(db, "milestones", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting milestone:", error);
        }
    };

    const seedDefaults = async () => {
        if (!confirm("This will add the default 4 milestones (1925, 1949, etc). Continue?")) return;
        try {
            for (const item of DEFAULT_MILESTONES) {
                await addDoc(collection(db, "milestones"), {
                    year: item.year,
                    title: item.title,
                    desc: item.desc,
                    createdAt: serverTimestamp()
                });
            }
            fetchItems();
        } catch (error) {
            console.error("Error seeding:", error);
        }
    };

    const resetForm = () => {
        setYear("");
        setTitle("");
        setDesc("");
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">History Milestones</h1>
                    <p className="text-neutral-500 text-sm">Manage the "History" timeline section on the homepage.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={seedDefaults}
                        className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 text-sm font-medium"
                    >
                        Seed Defaults
                    </button>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {isAdding ? "Cancel" : "Add Milestone"}
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in">
                    <h2 className="font-bold text-lg mb-4">New Milestone</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Year</label>
                                <input
                                    value={year}
                                    onChange={e => setYear(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="e.g. 1967"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Event Title"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                            <textarea
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                className="w-full p-2 border rounded-lg h-24"
                                placeholder="Short description..."
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                                Save Milestone
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
                <div className="text-center py-12 bg-neutral-50 rounded-xl border border-dotted border-neutral-300">
                    <p className="text-neutral-500 mb-4">No milestones found.</p>
                    <button onClick={seedDefaults} className="text-dravida-red font-bold hover:underline">
                        Click here to add default items
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="text-2xl font-bold text-neutral-200 w-24 text-center select-none">
                                    {item.year}
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-lg">{item.title}</h3>
                                    <p className="text-neutral-600">{item.desc}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-neutral-400 hover:text-red-600 p-2"
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
