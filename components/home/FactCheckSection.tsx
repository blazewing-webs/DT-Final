"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Check,
    AlertTriangle,
    Search,
    Share2,
    Info,
    ChevronDown,
    ExternalLink,
    ShieldAlert,
    Siren
} from "lucide-react";

// --- Types ---

interface FactCheckItem {
    id: string;
    claim: string;
    fact: string;
    verdict: "False" | "Misleading" | "True";
    source: string;
    date: string;
}

// --- Data ---

const factCheckData: FactCheckItem[] = [
    {
        id: "fc-001",
        claim: "அரசு அனைத்து இட ஒதுக்கீட்டையும் ரத்து செய்துவிட்டதாக சமூக வலைதளங்களில் தகவல் பரவுகிறது.",
        fact: "இட ஒதுக்கீடு கொள்கையில் எந்த மாற்றமும் செய்யப்படவில்லை என அரசு அதிகாரப்பூர்வமாக அறிவித்துள்ளது.",
        verdict: "False",
        source: "உச்சநீதிமன்ற தீர்ப்பு 2024",
        date: "Feb 18, 2026",
    },
    {
        id: "fc-002",
        claim: "புதிய கல்விக் கொள்கைப்படி 5-ாம் வகுப்பு வரை மட்டுமே இலவச கல்வி.",
        fact: "தவறு. இலவச கட்டாயக் கல்வி உரிமைச் சட்டத்தின்படி 8-ாம் வகுப்பு (14 வயது) வரை இலவச கல்வி தொடர்கிறது.",
        verdict: "False",
        source: "கல்வி அமைச்சக அறிக்கை",
        date: "Feb 15, 2026",
    },
    {
        id: "fc-003",
        claim: "பெண்கள் இட ஒதுக்கீடு மசோதா உடனடியாக அமலுக்கு வருகிறது.",
        fact: "இல்லை. மக்கள் தொகை கணக்கெடுப்பு மற்றும் தொகுதி மறுவரையறைக்கு பின்னரே இது அமலுக்கு வரும்.",
        verdict: "Misleading",
        source: "பாராளுமன்ற சட்ட வரைவு",
        date: "Feb 10, 2026",
    },
];

// --- Components ---

const VerdictBadge = ({ verdict }: { verdict: FactCheckItem["verdict"] }) => {
    const styles = {
        False: "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        Misleading: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
        True: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    };

    const icons = {
        False: <X className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />,
        Misleading: <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />,
        True: <Check className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />,
    };

    return (
        <div className={`flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border ${styles[verdict]} backdrop-blur-md`}>
            {icons[verdict]}
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{verdict}</span>
        </div>
    );
};

const FactCard = ({ item, index }: { item: FactCheckItem; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative w-full"
        >
            <div
                className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0F1115] border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/10"
            >
                {/* Abstract Glow Background */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-rose-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative p-5 md:p-8">
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-2 py-1 rounded bg-white/5 text-white/40 font-mono text-[10px] border border-white/5">
                                #{item.id.toUpperCase()}
                            </span>
                            <VerdictBadge verdict={item.verdict} />
                        </div>
                        <div className="text-white/30 text-xs font-mono flex items-center gap-2">
                            <Siren className="w-3 h-3" />
                            <span>VERIFIED: {item.date}</span>
                        </div>
                    </div>

                    {/* The Claim */}
                    <div className="mb-6 md:mb-8 relative pl-6">
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-red-500/50 rounded-full" />
                        <h3 className="text-lg md:text-2xl font-bold text-white/90 leading-snug font-sans mb-2">
                            "{item.claim}"
                        </h3>
                        <div className="text-red-400/60 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" /> Viral Misinformation
                        </div>
                    </div>

                    {/* Separation Line with 'VS' */}
                    <div className="relative h-px bg-white/10 w-full mb-6 md:mb-8 flex justify-center">
                        <span className="bg-[#0F1115] px-3 text-white/20 text-xs font-black tracking-widest absolute -top-2">TRUTH</span>
                    </div>

                    {/* The Fact */}
                    <div className="pl-6 relative">
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-emerald-500/50 rounded-full" />
                        <p className="text-base md:text-xl text-emerald-100/90 leading-relaxed font-medium">
                            {item.fact}
                        </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-white/40">
                            <Search className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="font-mono">Source:</span>
                            <span className="text-white/70 border-b border-white/10 pb-0.5">{item.source}</span>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs md:text-sm text-white font-medium group">
                            Full Analysis
                            <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function FactCheckSection() {
    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">

            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
            <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">

                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live Updates
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-6"
                    >
                        TRUTH <span className="font-serif italic text-white/30 px-2 lg:px-4">vs</span> NOISE
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        We verify viral social media claims so you don't have to.
                        <br className="hidden md:block" />
                        <span className="text-white/90">Stay informed with verified facts.</span>
                    </motion.p>
                </div>

                {/* Cards Stack */}
                <div className="flex flex-col gap-6 md:gap-10 mb-20">
                    {factCheckData.map((item, index) => (
                        <FactCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {/* Modern Glassmorphic CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative p-10 md:p-16 text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                            Spot something suspicious?
                        </h3>
                        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                            Submit viral messages, images, or videos for verification by our expert team.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="mailto:factcheck@dravidthalaimurai.in"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 group"
                            >
                                <ShieldAlert className="w-5 h-5" />
                                Submit for Fact Check
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
