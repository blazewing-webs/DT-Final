"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Scale, Brain, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PDFReaderModal from "@/components/shared/PDFReaderModal";
import { useLanguage } from "@/contexts/LanguageContext";

const heroText = {
    tn: {
        badge: "தினசரி செய்தி & இதழ்",
        title: "திராவிட தலைமுறை",
        subtitle: "சிந்திக்கும் இளம் குரல் | சமத்துவத்தின் பாதை",
        description: "சாதி, மதம், பாலினம் என எந்த வேறுபாடுமின்றி மனிதன் மனிதனாக வாழ வேண்டிய உரிமையை உரக்க பேசும் இளம் தலைமுறையின் குரல்தான் திராவிட தலைமுறை.",
        bullet1: "சிந்தனை எங்கள் ஆயுதம்",
        bullet2: "சமத்துவமே எங்கள் அடையாளம்",
    },
    en: {
        badge: "Daily News & Magazine",
        title: "Diravida Thalaimurai",
        subtitle: "The Thinking Young Voice | The Path of Equality",
        description: "Beyond caste, religion, and gender, we stand for every human being's right to live with dignity. The fearless voice that speaks aloud for justice, equality, and human dignity — that voice is Diravida Thalaimurai.",
        bullet1: "Thought is our weapon",
        bullet2: "Equality is our identity",
    },
};

export default function HeritageHero({ dictionary }: { dictionary?: any }) {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);


    const { isTamil } = useLanguage();
    const t = heroText[isTamil ? "tn" : "en"];


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
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
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
                        <span className="bg-red-50 border border-red-100 text-dravida-red px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-shadow-sm">
                            {t.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight drop-shadow-sm leading-[1.1]"
                    >
                        <span className="text-dravida-red drop-shadow-sm block">
                            {t.title}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-600 text-base md:text-lg font-semibold mb-4 max-w-lg"
                    >
                        {t.subtitle}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg"
                    >
                        {t.description}
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col gap-2 mb-10"
                    >
                        <li className="flex items-center gap-2 text-sm md:text-base font-semibold text-neutral-900">
                            <span className="text-blue-600">👉</span> {t.bullet1}
                        </li>
                        <li className="flex items-center gap-2 text-sm md:text-base font-semibold text-neutral-900">
                            <span className="text-blue-600">👉</span> {t.bullet2}
                        </li>
                    </motion.ul>
                </div>

                {/* Right Column: Carousel */}
                <div className="relative w-full h-[450px] lg:h-[550px] flex justify-center items-center perspective-[2000px] order-1 lg:order-2 mt-8 lg:mt-0">
                    <AnimatePresence initial={false} mode="popLayout">
                        {loading ? (
                            // Loading Skeleton
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute w-[200px] md:w-[260px] lg:w-[300px] aspect-[3/4] rounded-2xl shadow-xl bg-neutral-100 animate-pulse border-4 border-white z-20 flex items-center justify-center"
                            >
                                <div className="w-12 h-12 border-4 border-neutral-300 border-t-dravida-red rounded-full animate-spin"></div>
                            </motion.div>
                        ) : (
                            visibleCards.map((item) => {
                                let x = 0;
                                let y = 0;
                                let rotate = 0;
                                let zIndex = 0;
                                let scale = 0.9;
                                let opacity = 1;

                                if (item.position === 'left') {
                                    x = isMobile ? -85 : -180;
                                    y = isMobile ? 10 : 0;
                                    rotate = -12;
                                    zIndex = 10;
                                    scale = 0.85;
                                } else if (item.position === 'right') {
                                    x = isMobile ? 85 : 180;
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

                                const isCenter = item.position === 'center';

                                return (
                                    <motion.div
                                        key={item.key} // Stable key
                                        layoutId={item.key} // Optional: Keep layoutId for morphing if it works well, else remove
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ x, y, rotate, zIndex, scale, opacity }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        drag={isCenter ? "x" : false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.1}
                                        whileDrag={{ cursor: "grabbing", scale: 1.05, zIndex: 100 }}
                                        whileHover={isCenter ? { scale: 1.05 } : {}}
                                        onDragStart={() => setIsDragging(true)}
                                        onDragEnd={(e, { offset }) => {
                                            // Small timeout to allow onTap to read dragging state if needed, 
                                            // though mainly we just want to clear it after drag is done.
                                            setTimeout(() => setIsDragging(false), 150);

                                            if (offset.x < -30) handleNext(); // Reduce threshold slightly for responsive feel
                                            else if (offset.x > 30) handlePrev();
                                        }}
                                        onTap={() => {
                                            if (isDragging) return; // Prevent open if it was a drag

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
                                                src={item.coverUrl || item.image || "/logo.jpeg"} // Handle both fallback and fetched
                                                alt={item.title || "Magazine Cover"}
                                                fill
                                                className="object-cover pointer-events-none"
                                                priority={isCenter} // Prioritize center image
                                                loading={isCenter ? "eager" : "lazy"}
                                                sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 30vw"
                                            />
                                            <div className="absolute inset-0 bg-black/10"></div>
                                            {isCenter && (
                                                <div className="absolute bottom-6 left-6 text-left text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                        Read PDF <ExternalLink className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>

                    {/* Compact Floating Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        className="absolute bottom-8 w-[95%] max-w-lg bg-[#111]/95 text-white p-2 pr-6 rounded-full shadow-2xl flex items-center justify-between z-30 border border-white/10 backdrop-blur-md"
                    >
                        {/* Red Highlight Pill */}
                        <Link
                            href="/magazine"
                            className="bg-dravida-red text-white py-2 px-4 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                            <ArrowRight className="w-4 h-4 text-white" />
                            <div className="flex flex-col text-left">
                                <span className="text-lg font-bold leading-none">View</span>
                                <span className="text-[10px] opacity-90">Magazine</span>
                            </div>
                        </Link>

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
