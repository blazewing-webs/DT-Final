"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Scale, Brain, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PDFReaderModal from "@/components/shared/PDFReaderModal";


export default function HeritageHero({ dictionary }: { dictionary?: any }) {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);


    const t = dictionary?.hero || {
        badge: "Daily News & Magazine",
        title: "திராவிட தலைமுறை",
        subtitle: "சிந்திக்கும் இளம் குரல் | சமத்துவத்தின் பாதை",
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const q = query(collection(db, "magazines"), orderBy("createdAt", "desc"), limit(5));
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

    // Fallback if no magazines
    const features = [
        {
            id: "f1",
            title: "Heritage Series",
            coverUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
            desc: "Social Justice"
        },
        {
            id: "f2",
            title: "Heritage Series",
            coverUrl: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=2669&auto=format&fit=crop",
            desc: "Struggle"
        },
        {
            id: "f3",
            title: "Heritage Series",
            coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            desc: "Rationalism"
        }
    ];

    // Ensure we always have at least 3 items for the carousel logic to work without key collisions
    const displayItems = magazines.length >= 3
        ? magazines
        : [...magazines, ...features].slice(0, 3);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % displayItems.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
    };

    // Prepare the window of 3 items based on activeIndex
    const prevIndex = (activeIndex - 1 + displayItems.length) % displayItems.length;
    const nextIndex = (activeIndex + 1) % displayItems.length;

    const visibleCards = [
        { ...displayItems[prevIndex], position: 'left', key: displayItems[prevIndex].id },
        { ...displayItems[activeIndex], position: 'center', key: displayItems[activeIndex].id },
        { ...displayItems[nextIndex], position: 'right', key: displayItems[nextIndex].id }
    ];

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

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-600 text-base md:text-lg font-medium mb-10 max-w-lg"
                    >
                        {t.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link
                            href="/magazine"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-dravida-red text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-lg group"
                        >
                            View All Magazines
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column: Carousel */}
                <div className="relative w-full h-[450px] lg:h-[550px] flex justify-center items-center perspective-[2000px] order-1 lg:order-2 mt-8 lg:mt-0">
                    <AnimatePresence initial={false} mode="popLayout">
                        {visibleCards.map((item) => {
                            let x = 0;
                            let y = 0;
                            let rotate = 0;
                            let zIndex = 0;
                            let scale = 0.9;
                            let opacity = 1;

                            if (item.position === 'left') {
                                x = isMobile ? -40 : -180;
                                y = isMobile ? 10 : 0;
                                rotate = -12;
                                zIndex = 10;
                                scale = 0.85;
                            } else if (item.position === 'right') {
                                x = isMobile ? 40 : 180;
                                y = isMobile ? 10 : 0;
                                rotate = 12;
                                zIndex = 10;
                                scale = 0.85;
                            } else {
                                // Center
                                x = 0;
                                y = 0;
                                rotate = 0;
                                zIndex = 20;
                                scale = 1;
                            }

                            return (
                                <motion.div
                                    key={item.key} // Stable key
                                    layoutId={item.key} // Optional: Keep layoutId for morphing if it works well, else remove
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ x, y, rotate, zIndex, scale, opacity }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.1}
                                    whileDrag={{ cursor: "grabbing", scale: 1.05, zIndex: 100 }}
                                    whileHover={item.position === 'center' ? { scale: 1.05 } : {}}
                                    onDragEnd={(e, { offset }) => {
                                        if (offset.x < -50) handleNext();
                                        else if (offset.x > 50) handlePrev();
                                    }}
                                    onTap={() => {
                                        if (item.position === 'center') {
                                            if (item.pdfUrl) setSelectedPdf(item.pdfUrl);
                                        } else if (item.position === 'left') {
                                            handlePrev();
                                        } else {
                                            handleNext();
                                        }
                                    }}
                                    className="absolute w-[200px] md:w-[260px] lg:w-[300px] aspect-[3/4] rounded-2xl shadow-xl bg-white border-4 border-white cursor-grab"
                                >
                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-200">
                                        <Image
                                            src={item.coverUrl || item.image} // Handle both fallback and fetched
                                            alt={item.title}
                                            fill
                                            className="object-cover pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        {item.position === 'center' && (
                                            <div className="absolute bottom-6 left-6 text-left text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    Read PDF <ExternalLink className="w-3 h-3" />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Compact Floating Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        className="absolute bottom-8 w-[95%] max-w-lg bg-[#111]/95 text-white p-2 pr-6 rounded-full shadow-2xl flex items-center justify-between z-30 border border-white/10 backdrop-blur-md"
                    >
                        {/* Red Highlight Pill */}
                        <div className="bg-dravida-red text-white py-2 px-4 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer" onClick={() => displayItems[activeIndex].pdfUrl && setSelectedPdf(displayItems[activeIndex].pdfUrl)}>
                            <Users className="w-4 h-4 text-white" />
                            <div className="flex flex-col text-left">
                                <span className="text-lg font-bold leading-none">50K+</span>
                                <span className="text-[10px] opacity-90">வாசகர்கள்</span>
                            </div>
                        </div>

                        {/* Stats Group */}
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
            {/* PDF Modal */}
            <PDFReaderModal
                isOpen={!!selectedPdf}
                onClose={() => setSelectedPdf(null)}
                pdfUrl={selectedPdf}
            />
        </section>
    );
}
