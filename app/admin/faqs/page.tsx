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
        q: "What is the core objective of Dravida Thalaimurai? / திராவிட தலைமுறையின் முக்கிய நோக்கம் என்ன?",
        a: "To promote social justice, rationalism, and equality among the youth. / இளைஞர்களிடையே சமூக நீதி, பகுத்தறிவு மற்றும் சமத்துவத்தை ஊக்குவிப்பதே இதன் நோக்கம்."
    },
    {
        q: "Is this a political party? / இது ஒரு அரசியல் கட்சியா?",
        a: "No, it is a social movement and ideological platform, not a political party. / இல்லை, இது ஒரு சமூக இயக்கம் மற்றும் கருத்தியல் தளம், அரசியல் கட்சி அல்ல."
    },
    {
        q: "Who can join this movement? / இந்த இயக்கத்தில் யார் இணையலாம்?",
        a: "Anyone who believes in humanity and equality, regardless of caste or religion. / சாதி, மத வேறுபாடின்றி மனிதநேயத்தையும் சமத்துவத்தையும் நம்பும் யார் வேண்டுமானாலும் இணையலாம்."
    },
    {
        q: "How can students contribute? / மாணவர்கள் எவ்வாறு பங்களிக்க முடியும்?",
        a: "Students can write articles, participate in events, and spread awareness about social rights. / மாணவர்கள் கட்டுரைகள் எழுதலாம், நிகழ்வுகளில் பங்கேற்கலாம் மற்றும் சமூக உரிமைகள் பற்றிய விழிப்புணர்வை ஏற்படுத்தலாம்."
    },
    {
        q: "What is the stance on education? / கல்வியில் உங்கள் நிலைப்பாடு என்ன?",
        a: "We believe in 'Education for All' and oppose barriers to learning. / 'அனைவருக்கும் கல்வி' என்பதை நாங்கள் நம்புகிறோம் மற்றும் கற்றல் தடைகளை எதிர்க்கிறோம்."
    },
    {
        q: "Do you support women's rights? / பெண்கள் உரிமைகளை ஆதரிக்கிறீர்களா?",
        a: "Yes, women's liberation and empowerment are fundamental to our ideology. / ஆம், பெண் விடுதலையும் அதிகாரமளித்தலும் எங்கள் கொள்கையின் அடிப்படையாகும்."
    },
    {
        q: "How to submit articles? / கட்டுரைகளை எவ்வாறு சமர்ப்பிப்பது?",
        a: "You can submit articles via the 'Contact Us' page or email us directly. / 'தொடர்பு கொள்க' பக்கம் மூலமாகவோ அல்லது மின்னஞ்சல் மூலமாகவோ கட்டுரைகளை அனுப்பலாம்."
    },
    {
        q: "Are there membership fees? / இதில் இணைய கட்டணம் உள்ளதா?",
        a: "No, joining and participating in our digital platform is completely free. / இல்லை, எங்கள் டிஜிட்டல் தளத்தில் இணைவதும் பங்கேற்பதும் முற்றிலும் இலவசம்."
    },
    {
        q: "What is the Dravidian Model? / திராவிட மாடல் என்றால் என்ன?",
        a: "It is a governance model based on inclusive growth, social justice, and equality. / இது அனைவரையும் உள்ளடக்கிய வளர்ச்சி, சமூக நீதி மற்றும் சமத்துவத்தை அடிப்படையாகக் கொண்ட நிர்வாக முறை."
    },
    {
        q: "How do I stay updated? / உடனுக்குடன் தகவல்களை பெறுவது எப்படி?",
        a: "Follow our website and social media handles for daily news and updates. / தினசரி செய்திகள் மற்றும் அறிவிப்புகளுக்கு எங்கள் இணையதளம் மற்றும் சமூக ஊடக பக்கங்களைப் பின்தொடரவும்."
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
