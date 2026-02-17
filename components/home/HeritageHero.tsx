"use client";

import { motion } from "framer-motion";
import { Users, Scale, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HeritageHero({ dictionary }: { dictionary?: any }) {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const t = dictionary?.hero || {
        badge: "Daily News & Magazine",
        title: "திராவிட தலைமுறை",
        subtitle: "சிந்திக்கும் இளம் குரல் | சமத்துவத்தின் பாதை",
    };

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const q = query(collection(db, "magazines"), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (data.length > 0) {
                    setMagazines(data);
                }
            } catch (error) {
                console.error("Error fetching magazines:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    // Fallback data if no magazines
    const features = [
        {
            id: "f1",
            title: "Heritage Series",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
            desc: "Social Justice"
        },
        {
            id: "f2",
            title: "Heritage Series",
            image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=2669&auto=format&fit=crop",
            desc: "Struggle"
        },
        {
            id: "f3",
            title: "Heritage Series",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            desc: "Rationalism"
        }
    ];

    // Ensure we always have 3 items (Left, Center, Right)
    const items = magazines.length >= 3 ? magazines.slice(0, 3) : [...magazines, ...features].slice(0, 3);
    // If absolutely nothing, use features
    const finalItems = items.length === 3 ? items : features;

    const [leftItem, centerItem, rightItem] = finalItems;

    return (
        <section className="relative w-full min-h-[90vh] bg-transparent text-neutral-900 overflow-hidden flex items-center pt-24 pb-12 lg:pt-32">

            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-dravida-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container relative z-10 px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="bg-amber-100 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-shadow-sm">
                            {t.badge}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight drop-shadow-sm leading-[1.1]"
                    >
                        <span className="bg-gradient-to-r from-amber-700 via-amber-900 to-amber-700 bg-clip-text text-transparent filter drop-shadow-sm block">
                            {t.title}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-600 text-base md:text-lg font-medium mb-10 max-w-lg"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Right Column: Visual Composition */}
                <div className="relative w-full h-[450px] lg:h-[550px] flex justify-center items-center perspective-[2000px] order-1 lg:order-2 mt-8 lg:mt-0">

                    {/* Left Card (Tilted Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -20 }}
                        animate={{ opacity: 1, x: 0, rotate: -12 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute left-[5%] md:left-[10%] lg:left-[5%] top-8 w-[160px] md:w-[220px] lg:w-[240px] aspect-[3/4] rounded-2xl shadow-xl bg-white border-4 border-white z-10 transform origin-bottom-right"
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-200">
                            <Image
                                src={leftItem?.coverUrl || leftItem?.image}
                                alt="Left Magazine"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </motion.div>

                    {/* Right Card (Tilted Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 20 }}
                        animate={{ opacity: 1, x: 0, rotate: 12 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute right-[5%] md:right-[10%] lg:right-[5%] top-8 w-[160px] md:w-[220px] lg:w-[240px] aspect-[3/4] rounded-2xl shadow-xl bg-white border-4 border-white z-10 transform origin-bottom-left"
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-200">
                            <Image
                                src={rightItem?.coverUrl || rightItem?.image}
                                alt="Right Magazine"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </motion.div>

                    {/* Center Card (Straight) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="absolute top-0 w-[200px] md:w-[260px] lg:w-[300px] aspect-[3/4] rounded-2xl shadow-2xl bg-white border-4 border-white z-20 cursor-pointer hover:-translate-y-2 transition-transform"
                        onClick={() => centerItem?.pdfUrl && window.open(centerItem.pdfUrl, '_blank')}
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-200">
                            <Image
                                src={centerItem?.coverUrl || centerItem?.image}
                                alt="Center Magazine"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 text-left text-white">
                                <h3 className="text-xl font-bold leading-tight drop-shadow-md">{centerItem?.title || "Latest Issue"}</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Compact Floating Stats Bar (Aligned to Visuals) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        className="absolute bottom-8 w-[95%] max-w-lg bg-[#111]/95 text-white p-2 pr-6 rounded-full shadow-2xl flex items-center justify-between z-30 border border-white/10 backdrop-blur-md"
                    >
                        {/* Red Highlight Pill */}
                        <div className="bg-dravida-red text-white py-2 px-4 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
                            <Users className="w-4 h-4 text-white" />
                            <div className="flex flex-col text-left">
                                <span className="text-lg font-bold leading-none">50K+</span>
                                <span className="text-[10px] opacity-90">வாசகர்கள்</span>
                            </div>
                        </div>

                        {/* Simplified Stats Group for Compact Layout */}
                        <div className="flex items-center gap-6 justify-end flex-1 px-2">
                            <div className="flex flex-col text-right">
                                <span className="text-lg font-bold">100+</span>
                                <span className="text-[9px] text-neutral-400">ஆண்டுகள்</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-lg font-bold">500+</span>
                                <span className="text-[9px] text-neutral-400">கட்டுரைகள்</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
