"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, Loader2, HelpCircle } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    order: number;
}

const DEFAULT_FAQS = [
    {
        q: "திராவிட தலைமுறை அரசியல் கட்சியா?",
        a: "இல்லை. இது ஒரு சிந்தனை இயக்கம். சமூக நீதி மற்றும் பகுத்தறிவு கருத்துக்களை மக்களிடம் கொண்டு சேர்ப்பதே இதன் நோக்கம்."
    },
    {
        q: "யார் வேண்டுமானாலும் இணையலாமா?",
        a: "ஆம். சாதி, மதம், பாலினம், மொழி என எந்த வேற்றுமையும் இன்றி மனிதநேயம் கொண்ட யார் வேண்டுமானாலும் இணையலாம்."
    },
    {
        q: "இந்த தளம் யாருக்காக?",
        a: "மாணவர்கள், இளைஞர்கள் மற்றும் சமூக மாற்றத்தை விரும்பும் அனைத்து பொதுமக்களுக்கும் ஆனது."
    }
];

export default function FAQManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form inputs
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "faqs"), orderBy("createdAt", "asc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as FAQ[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
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
            await addDoc(collection(db, "faqs"), {
                question,
                answer,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setQuestion("");
            setAnswer("");
            fetchItems();
        } catch (error) {
            console.error("Error adding FAQ:", error);
            alert("Failed to add FAQ");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this FAQ?")) return;
        try {
            await deleteDoc(doc(db, "faqs", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    const seedDefaults = async () => {
        if (!confirm("This will add default FAQs. Continue?")) return;
        try {
            for (const item of DEFAULT_FAQS) {
                await addDoc(collection(db, "faqs"), {
                    question: item.q,
                    answer: item.a,
                    createdAt: serverTimestamp()
                });
            }
            fetchItems();
        } catch (error) {
            console.error("Error seeding:", error);
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-800">FAQ Management</h1>
                    <p className="text-neutral-500 text-sm">Manage Frequently Asked Questions.</p>
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
                        {isAdding ? "Cancel" : "Add FAQ"}
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in">
                    <h2 className="font-bold text-lg mb-4">New FAQ</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Question</label>
                            <input
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                placeholder="e.g. How do I join?"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Answer</label>
                            <textarea
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                className="w-full p-2 border rounded-lg h-24"
                                placeholder="Short answer..."
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                                Save FAQ
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
                    <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500 mb-4">No FAQs found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-neutral-900 text-lg mb-1">{item.question}</h3>
                                <p className="text-neutral-600 text-sm whitespace-pre-wrap">{item.answer}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-neutral-400 hover:text-red-600 p-2 ml-4"
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
