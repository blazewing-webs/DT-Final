"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Loader2, Link as LinkIcon, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";

interface YouthDeskItem {
    id: string;
    title: string;
    description: string;
    link: string;
    createdAt: any;
}

export default function YouthDeskPage() {
    const [items, setItems] = useState<YouthDeskItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, "youth_desk"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as YouthDeskItem[];
                setItems(data);
            } catch (error) {
                console.error("Error fetching youth desk items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="இளைஞர் அணி (Youth Desk)"
                description="Engaging the next generation in social awareness and political activism."
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Youth Desk", href: "/youth-desk" },
                ]}
            />

            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <Users className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No Updates Found</h3>
                        <p className="text-neutral-500">Check back later for opportunities.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all group overflow-hidden flex flex-col h-full">
                                <div className="p-6 flex-1">
                                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-dravida-red mb-4 group-hover:bg-dravida-red group-hover:text-white transition-colors">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-dravida-red transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                </div>
                                {item.link && (
                                    <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between font-bold text-neutral-800 hover:text-dravida-red transition-colors"
                                        >
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
