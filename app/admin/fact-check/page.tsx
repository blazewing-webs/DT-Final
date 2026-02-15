"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Plus, CheckCircle, Loader2, AlertTriangle, XCircle } from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

interface FactCheckItem {
    id: string;
    claim: string;
    verdict: "True" | "False" | "Misleading";
    explanation: string;
    imageUrl: string;
    createdAt: any;
}

export default function FactCheckManagement() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<FactCheckItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newClaim, setNewClaim] = useState("");
    const [newVerdict, setNewVerdict] = useState<"True" | "False" | "Misleading">("False");
    const [newExplanation, setNewExplanation] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "fact_checks"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as FactCheckItem[];
            setItems(data);
        } catch (error) {
            console.error("Error fetching fact checks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchItems();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this fact check?")) return;
        try {
            await deleteDoc(doc(db, "fact_checks", id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting fact check:", error);
            alert("Failed to delete item");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "fact_checks"), {
                claim: newClaim,
                verdict: newVerdict,
                explanation: newExplanation,
                imageUrl: newImageUrl,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setNewClaim("");
            setNewVerdict("False");
            setNewExplanation("");
            setNewImageUrl("");
            fetchItems();
        } catch (error) {
            console.error("Error adding fact check:", error);
            alert("Failed to add item");
        }
    };

    if (authLoading) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-800">Fact Check Management</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isAdding ? "Cancel" : "Add Fact Check"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="font-bold text-lg mb-4">New Fact Check</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Claim (The statement being checked)</label>
                            <input
                                type="text"
                                value={newClaim}
                                onChange={(e) => setNewClaim(e.target.value)}
                                placeholder="e.g. 'Government is banning all social media'"
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Verdict</label>
                                <select
                                    value={newVerdict}
                                    onChange={(e) => setNewVerdict(e.target.value as any)}
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                >
                                    <option value="False">False (Fake)</option>
                                    <option value="Misleading">Misleading</option>
                                    <option value="True">True</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Evidence / Screenshot URL</label>
                                <input
                                    type="url"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="https://example.com/evidence.jpg"
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Explanation / Fact</label>
                            <textarea
                                value={newExplanation}
                                onChange={(e) => setNewExplanation(e.target.value)}
                                placeholder="Explain why this claim is false/true..."
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 h-24"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-dravida-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Publish Fact Check
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
                    <CheckCircle className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No fact checks published yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex gap-4 items-start">
                            <div className="shrink-0 pt-1">
                                {item.verdict === "False" && <XCircle className="text-red-600 w-6 h-6" />}
                                {item.verdict === "Misleading" && <AlertTriangle className="text-yellow-500 w-6 h-6" />}
                                {item.verdict === "True" && <CheckCircle className="text-green-600 w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded
                                    ${item.verdict === "False" ? "bg-red-100 text-red-700" :
                                        item.verdict === "Misleading" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-green-100 text-green-700"}`}>
                                    {item.verdict}
                                </span>
                                <h3 className="font-bold text-neutral-900 mt-1">{item.claim}</h3>
                                <p className="text-sm text-neutral-600 mt-1">{item.explanation}</p>
                                {item.imageUrl && (
                                    <div className="mt-2 h-20 w-32 bg-neutral-100 rounded overflow-hidden">
                                        <img src={item.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-neutral-300 hover:text-red-600 transition-colors p-2"
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
