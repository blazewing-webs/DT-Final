"use client";

import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Send, ShieldCheck, ArrowRight } from "lucide-react";

type VerificationStatus = "true" | "false" | "misleading";

interface FactCheckItem {
    id: string;
    question: string;
    status: VerificationStatus;
    statusText: string;
    explanation: string;
    source: string;
    link: string;
}

const factCheckData: FactCheckItem[] = [
    {
        id: "1",
        question: "அரசு அனைத்து இட ஒதுக்கீட்டையும் ரத்து செய்துவிட்டதா?",
        status: "false",
        statusText: "தவறான தகவல்",
        explanation: "சமூக ஊடகங்களில் பரவும் இந்த தகவல் முழுமையாக தவறானது.",
        source: "உச்சநீதிமன்ற தீர்ப்பு, அரசு அறிவிப்பு",
        link: "#",
    },
    {
        id: "2",
        question: "பெண்கள் இட ஒதுக்கீடு மசோதா நிறைவேற்றப்பட்டதா?",
        status: "true",
        statusText: "உண்மை",
        explanation: "பெண்கள் இட ஒதுக்கீடு மசோதா பாராளுமன்றத்தில் நிறைவேற்றப்பட்டது.",
        source: "நாடாளுமன்ற பதிவுகள்",
        link: "#",
    },
    {
        id: "3",
        question: "புதிய கல்விக் கொள்கை முழுவதும் மாநிலங்களை புறக்கணிக்கிறதா?",
        status: "misleading",
        statusText: "வழிதவற வைக்கும் தகவல்",
        explanation: "சில பகுதிகள் உண்மை, ஆனால் முழுமையான தகவல் தவறாக பரப்பப்படுகிறது.",
        source: "கல்வி அமைச்சகம், ஆய்வு அறிக்கைகள்",
        link: "#",
    },
];

const StatusBadge = ({ status, text }: { status: VerificationStatus; text: string }) => {
    switch (status) {
        case "false":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-red-100/80 text-red-700 border border-red-200">
                    <XCircle className="w-4 h-4" />
                    {text}
                </span>
            );
        case "true":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-green-100/80 text-green-700 border border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    {text}
                </span>
            );
        case "misleading":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-yellow-100/80 text-yellow-700 border border-yellow-200">
                    <AlertTriangle className="w-4 h-4" />
                    {text}
                </span>
            );
        default:
            return null;
    }
};

const getBorderColor = (status: VerificationStatus) => {
    switch (status) {
        case "false": return "border-red-500";
        case "true": return "border-green-500";
        case "misleading": return "border-yellow-500";
        default: return "border-gray-200";
    }
};

const FactCheckCard = ({ item }: { item: FactCheckItem }) => {
    const borderColor = getBorderColor(item.status);

    return (
        <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-t border-r border-b border-gray-100 overflow-hidden`}>
            {/* Colored Left Border */}
            <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${borderColor.replace('border-', 'bg-')} transition-all group-hover:w-2`} />

            <div className="p-6 pl-8 h-full flex flex-col">
                <div className="mb-4">
                    <StatusBadge status={item.status} text={item.statusText} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-black transition-colors">
                    {item.question}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-sm md:text-base">
                    {item.explanation}
                </p>

                <div className="pt-4 border-t border-gray-50 mt-auto">
                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                        ஆதாரம்
                    </div>
                    <div className="text-sm text-gray-700 font-medium mb-4 truncate">
                        {item.source}
                    </div>

                    <a
                        href={item.link}
                        className="inline-flex items-center text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors"
                    >
                        முழு விளக்கம்
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function FactCheckSection() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute top-40 -left-20 w-60 h-60 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                        <ShieldCheck className="w-3 h-3 text-red-500" />
                        <span>Truth vs Fake</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-serif tracking-tight">
                        Fact Check
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                        சமூக ஊடகங்களில் பரவும் தகவல்கள் உண்மையா? பொய்யா? <br className="hidden md:block" />
                        <span className="font-semibold text-black relative inline-block">
                            திராவிட தலைமுறை
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-red-100/50 -z-10"></span>
                        </span> ஆதாரங்களுடன் உண்மையை உறுதிப்படுத்துகிறது.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
                    {factCheckData.map((item) => (
                        <FactCheckCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Improved CTA Section */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="relative p-8 md:p-12 lg:p-16 text-center">
                        <div className="flex flex-col items-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                                <Send className="w-8 h-8 text-yellow-400 transform -rotate-12 translate-x-0.5" />
                            </div>

                            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white font-serif">
                                சந்தேகமான தகவல் உள்ளதா?
                            </h3>

                            <p className="text-gray-300 mb-10 text-lg leading-relaxed max-w-xl">
                                நீங்கள் சமூக வலைதளங்களில் பார்க்கும் செய்திகள் உண்மையா என அறிய, அந்த தகவலை எங்களுக்கு அனுப்புங்கள்.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                <a
                                    href="mailto:factcheck@dravidthalaimurai.in"
                                    className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 duration-200"
                                >
                                    <span>மின்னஞ்சல் அனுப்புக</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <div className="text-gray-500 font-mono text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                    factcheck@dravidthalaimurai.in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
