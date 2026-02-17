"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChevronLeft, ChevronRight, BookOpen, ExternalLink, Loader2, ArrowUpRight, Users, Calendar, FileText } from "lucide-react";
import Link from "next/link";

interface Magazine {
    id: string;
    title: string;
    month: string;
    coverUrl: string;
    pdfUrl: string;
}

export default function MagazineHero() {
    console.log("MagazineHero: Rendering Tamil Version");
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                // Fetch latest 5 magazines
                const q = query(collection(db, "magazines"), orderBy("createdAt", "desc"), limit(5));
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

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + magazines.length) % magazines.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % magazines.length);
    };

    if (loading) {
        return (
            <div className="w-full h-[800px] flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
            </div>
        );
    }

    if (magazines.length === 0) return null;

    const activeMagazine = magazines[activeIndex];

    // Get previous and next indices for the 3-item layout
    const prevIndex = (activeIndex - 1 + magazines.length) % magazines.length;
    const nextIndex = (activeIndex + 1) % magazines.length;

    const displayMagazines = [
        { ...magazines[prevIndex], position: 'left' },
        { ...activeMagazine, position: 'center' },
        { ...magazines[nextIndex], position: 'right' }
    ];

    return (
        <section className="relative w-full min-h-auto md:min-h-[850px] bg-white text-neutral-900 overflow-hidden flex flex-col pt-8 md:pt-12 pb-12 md:pb-20">

            {/* Header Content */}
            <div className="container mx-auto px-4 z-10 text-center mb-6 md:mb-12">
                <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                    <div className="flex -space-x-2">
                        {/* Placeholder avatars or icons to mimic the reference 'satisfied customers' */}
                        <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-bold">DT</div>
                        <div className="w-8 h-8 rounded-full bg-neutral-300 border-2 border-white flex items-center justify-center text-xs font-bold">TN</div>
                        <div className="w-8 h-8 rounded-full bg-neutral-400 border-2 border-white flex items-center justify-center text-xs font-bold">SJ</div>
                    </div>
                    <span className="text-sm font-semibold text-neutral-600">5000+ Regular Readers</span>
                </div>

                <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.4] mb-4 md:mb-8">
                    திராவிட இயக்கமே <br />
                    <span className="text-dravida-red">சமூக நீதியின் அடித்தளம்</span>
                </h1>

                {/* <p className="max-w-3xl mx-auto text-xl text-neutral-500 mb-10 font-medium leading-relaxed">
                    திராவிட இயக்கத்தின் வரலாறு, கொள்கைகள் மற்றும் சமகாலத் தேவைகளை எங்கள் இதழ்கள் வாயிலாக அறிந்து கொள்ளுங்கள்.
                </p> */}
            </div>

            {/* Main Visuals - 3 Magazines */}
            <div className="relative flex-1 container mx-auto px-4 flex justify-center items-end min-h-[350px] md:min-h-[400px] mb-8 md:mb-0">
                <div className="relative w-full max-w-4xl h-[400px] md:h-[500px] flex items-end justify-center">
                    <AnimatePresence mode="popLayout">
                        {displayMagazines.map((mag, idx) => {
                            let x = 0;
                            let scale = 1;
                            let zIndex = 10;
                            let rotate = 0;
                            let opacity = 1;
                            let y = 0;

                            if (mag.position === 'left') {
                                x = isMobile ? -40 : -220; // Tight stack on mobile
                                scale = isMobile ? 0.9 : 0.85;
                                zIndex = 5;
                                rotate = -6; // Less rotation
                                opacity = 1; // Visible now
                                y = isMobile ? 10 : 40;
                            } else if (mag.position === 'right') {
                                x = isMobile ? 40 : 220; // Tight stack on mobile
                                scale = isMobile ? 0.9 : 0.85;
                                zIndex = 4;
                                rotate = 6;
                                opacity = 1;
                                y = isMobile ? 10 : 40;
                            } else {
                                // Center
                                zIndex = 20;
                                y = 0;
                            }

                            return (
                                <motion.div
                                    key={mag.id}
                                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                                    animate={{
                                        x,
                                        y,
                                        scale,
                                        zIndex,
                                        rotate,
                                        opacity
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.1}
                                    whileDrag={{ zIndex: 100, scale: 1.05, cursor: "grabbing" }}
                                    whileHover={mag.position === 'center' ? { scale: 1.05 } : {}}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute bottom-0 w-[240px] md:w-[340px] aspect-[3/4] rounded-xl shadow-2xl overflow-hidden cursor-grab bg-neutral-100 group"
                                    onDragEnd={(e, info) => {
                                        const { offset } = info;
                                        if (offset.x < -50) {
                                            handleNext();
                                        } else if (offset.x > 50) {
                                            handlePrev();
                                        }
                                    }}
                                    onTap={() => {
                                        if (mag.position === 'center') {
                                            window.open(mag.pdfUrl, '_blank');
                                        } else if (mag.position === 'left') {
                                            handlePrev();
                                        } else {
                                            handleNext();
                                        }
                                    }}
                                >
                                    <img
                                        src={mag.coverUrl}
                                        alt={mag.title}
                                        className="w-full h-full object-cover pointer-events-none" // Prevent img drag interfering
                                    />
                                    {/* Hover Overlay for Center Item */}
                                    {mag.position === 'center' && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                Read Now <ExternalLink className="w-4 h-4" />
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Black Card - Relative on Mobile, Absolute on Desktop */}
            <div className="relative md:absolute md:bottom-8 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[95%] max-w-5xl z-30 px-4 md:px-0 mt-8 md:mt-0">
                <div className="bg-[#111] text-white rounded-[2rem] p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-12">

                    {/* CTA Block (Colored) */}
                    <div className="bg-dravida-red text-white p-6 rounded-[1.5rem] flex-shrink-0 w-full md:w-auto md:min-w-[280px] relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-1">Latest Issue</h3>
                            <p className="text-white/80 text-sm mb-4 line-clamp-1">{activeMagazine.month}</p>
                            <a
                                href={activeMagazine.pdfUrl}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                            >
                                Read PDF <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-2 md:gap-8 w-full">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] md:text-xs uppercase font-bold tracking-wider">Heritage</span>
                            </div>
                            <div className="text-xl md:text-3xl font-bold">100+</div>
                            <div className="text-[10px] md:text-xs text-neutral-500 mt-1">Years of History</div>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 mb-1">
                                <FileText className="w-4 h-4" />
                                <span className="text-[10px] md:text-xs uppercase font-bold tracking-wider">Archives</span>
                            </div>
                            <div className="text-xl md:text-3xl font-bold">{magazines.length}+</div>
                            <div className="text-[10px] md:text-xs text-neutral-500 mt-1">Digital Issues</div>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="text-[10px] md:text-xs uppercase font-bold tracking-wider">Community</span>
                            </div>
                            <div className="text-xl md:text-3xl font-bold">50k+</div>
                            <div className="text-[10px] md:text-xs text-neutral-500 mt-1">Active Readers</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neutral-100 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
        </section>
    );
}
