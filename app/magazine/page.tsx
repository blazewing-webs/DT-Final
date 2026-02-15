"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, BookOpen, ExternalLink, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";

interface Magazine {
    id: string;
    title: string;
    month: string;
    coverUrl: string;
    pdfUrl: string;
}

export default function MagazinePage() {
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const q = query(collection(db, "magazines"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Magazine[];
                setMagazines(data);
            } catch (error) {
                console.error("Error fetching magazines:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="மாத இதழ் (Magazine)"
                description="திராவிடத் தலைமுறை - மாத இதழ் தொகுப்பு"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Magazine", href: "/magazine" },
                ]}
            />

            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : magazines.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <BookOpen className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No Magazines Found</h3>
                        <p className="text-neutral-500">Check back later for our latest issues.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {magazines.map((mag) => (
                            <div key={mag.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
                                    {mag.coverUrl ? (
                                        <img
                                            src={mag.coverUrl}
                                            alt={mag.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <BookOpen className="w-12 h-12 text-neutral-300" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <a
                                            href={mag.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform"
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-dravida-red uppercase tracking-wider mb-2">
                                        <Calendar className="w-3 h-3" />
                                        {mag.month}
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 leading-tight mb-3 line-clamp-2">
                                        {mag.title}
                                    </h3>
                                    <a
                                        href={mag.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-600 hover:text-dravida-red transition-colors"
                                    >
                                        Download / Read <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
