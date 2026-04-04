"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TopBar from "./TopBar";

const navItems = [
    { tn: "முகப்பு", en: "Home", href: "/" },
    {
        tn: "பிரிவுகள்", en: "Categories", dropdown: [
            { tn: "சமூக நீதி", en: "Social Justice", href: "/social-justice" },
            { tn: "அரசியல்", en: "Politics", href: "/politics" },
            { tn: "பெண்கள் & பாலினம்", en: "Women & Gender", href: "/women" },
            { tn: "இளைஞர் மேசை", en: "Youth Desk", href: "/youth-desk" },
            { tn: "உண்மைச் சோதனை", en: "Fact Check", href: "/fact-check" },
            { tn: "யூடியூப்", en: "YouTube", href: "/youtube" },
        ]
    },
    { tn: "மாத இதழ்", en: "Monthly Magazine", href: "/magazine" },
    { tn: "ஆசிரியர் கருத்து", en: "Editorial Note", href: "/editorial" },
    { tn: "எங்கள் கொள்கை", en: "Our Policy", href: "/about" },
    { tn: "தொடர்பு", en: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isTamil } = useLanguage();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const linkCls =
        "text-neutral-800 text-[12px] 2xl:text-[13px] font-extrabold uppercase tracking-wide hover:text-dravida-red transition-all duration-300 relative group py-2 whitespace-nowrap";
    const underline =
        "absolute bottom-0 left-0 w-0 h-[3px] bg-dravida-red transition-all duration-300 group-hover:w-full rounded-t-sm";

    return (
        <header className="fixed top-0 w-full z-50 flex flex-col shadow-sm">
            {/* Breaking News Ticker */}
            <div className="bg-dravida-red text-white py-1.5 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 flex items-center gap-4">
                    <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                        <Bell className="w-3.5 h-3.5 animate-bounce fill-current" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                            {isTamil ? "முக்கிய செய்தி:" : "BREAKING:"}
                        </span>
                    </div>
                    <div className="relative flex-1 h-5 overflow-hidden">
                        <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-12 text-[11px] md:text-[13px] font-bold">
                            <span>{isTamil ? "பகுத்தறிவுப் போராட்டத்தின் அடுத்த கட்டம் குறித்த ஆசிரியரின் சிறப்பு பதிவு இப்போது வாசிக்க கிடைக்கிறது." : "The editor's special note on the next phase of the rationalist struggle is now available for reading."}</span>
                            <span>{isTamil ? "திராவிட தலைமுறை மாத இதழின் புதிய பதிப்பு இப்போது விற்பனையில்." : "The new edition of Diravida Thalaimurai monthly magazine is now on sale."}</span>
                            <span>{isTamil ? "மக்களாட்சி விழுமியங்களை காக்க ஒன்றிணைவோம்." : "Let's unite to protect democratic values."}</span>
                        </div>
                    </div>
                </div>
            </div>

            <TopBar />

            <nav
                className={`w-full font-sans transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200 py-1.5 shadow-md"
                    : "bg-white border-b border-neutral-100 py-3"
                    }`}
            >
                <div className="w-full mx-auto px-4 md:px-6 xl:px-8 2xl:px-12">
                    <div className="flex items-center justify-between">

                        {/* Logo (Left) */}
                        <div className="flex-shrink-0 z-10 flex items-center">
                            <Link href="/" className="flex items-center gap-3 xl:gap-4 transition-transform hover:scale-105 duration-300 group">
                                <img
                                    src="/logo.jpeg"
                                    alt="திராவிட தலைமுறை"
                                    className={`w-auto object-contain transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-md ${scrolled ? "h-10 md:h-12 xl:h-14" : "h-14 md:h-16 xl:h-20"}`}
                                />
                                <div className="flex flex-col justify-center">
                                    <span className={`font-black text-[#991b1b] tracking-tight leading-none transition-all duration-500 ${scrolled ? "text-base xl:text-lg 2xl:text-xl" : "text-xl xl:text-2xl 2xl:text-3xl"}`}>
                                        {isTamil ? "திராவிட தலைமுறை" : "DIRAVIDA THALAIMURAI"}
                                    </span>
                                    <span className={`text-[#991b1b]/80 font-extrabold tracking-widest transition-all duration-500 mt-1 ${scrolled ? "text-[8px] xl:text-[9px]" : "text-[10px] xl:text-[11px] 2xl:text-[12px]"}`}>
                                        {isTamil ? "சிந்திக்கும் இளம் குரல் | சமத்துவத்தின் பாதை" : "THE THINKING YOUNG VOICE | PATH TO EQUALITY"}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links (Right) */}
                        <div className="hidden xl:flex items-center justify-end gap-3 2xl:gap-6 flex-1 ml-4 mt-1">
                            {navItems.map((item, i) => (
                                item.dropdown ? (
                                    <div key={i} className="relative group/dropdown h-[60px] flex items-center">
                                        <button className={linkCls + " flex items-center gap-1.5"}>
                                            {isTamil ? item.tn : item.en}
                                            <ChevronDown className="w-4 h-4 mt-0.5 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                                            <span className={underline} />
                                        </button>
                                        <div className="absolute top-[60px] right-0 opacity-0 translate-y-2 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-300">
                                            <div className="bg-white border border-neutral-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl py-3 min-w-[220px] flex flex-col">
                                                {item.dropdown.map(subItem => (
                                                    <Link key={subItem.href} href={subItem.href!} className="px-5 py-2.5 text-[12px] 2xl:text-[13px] font-extrabold text-neutral-700 hover:text-dravida-red hover:bg-neutral-50 transition-colors uppercase tracking-wider">
                                                        {isTamil ? subItem.tn : subItem.en}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link key={item.href} href={item.href!} className={linkCls}>
                                        {isTamil ? item.tn : item.en}
                                        <span className={underline} />
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="xl:hidden flex items-center z-20">
                            <button
                                className="p-2 text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {isOpen && (
                    <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        <div className="p-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
                            {navItems.map((item, i) => (
                                item.dropdown ? (
                                    <div key={i} className="flex flex-col gap-1 mb-2">
                                        <div className="text-[12px] font-black text-neutral-400 py-2 px-4 uppercase tracking-widest mt-2">
                                            {isTamil ? item.tn : item.en}
                                        </div>
                                        {item.dropdown.map(subItem => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href!}
                                                className="text-[14px] font-bold text-neutral-700 py-3 px-4 pl-6 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 hover:text-dravida-red transition-all flex items-center justify-between group"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span>{isTamil ? subItem.tn : subItem.en}</span>
                                                </div>
                                                <span className="text-dravida-red opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href!}
                                        className="text-[15px] font-bold text-neutral-800 py-3 px-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all flex items-center justify-between group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span>{isTamil ? item.tn : item.en}</span>
                                        </div>
                                        <span className="text-neutral-400 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">→</span>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
