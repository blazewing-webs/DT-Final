"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
    { tn: "முகப்பு", en: "Home", href: "/" },
    { tn: "எங்களை பற்றி", en: "About Us", href: "/about" },
    { tn: "சமூக நீதி", en: "Social Justice", href: "/social-justice" },
    { tn: "அரசியல்", en: "Politics", href: "/politics" },
    { tn: "பெண்கள் & பாலினம்", en: "Women & Gender", href: "/women" },
    { tn: "இளைஞர் மேசை", en: "Youth Desk", href: "/youth-desk" },
    { tn: "உண்மைச் சோதனை", en: "Fact Check", href: "/fact-check" },
    { tn: "மாத இதழ்", en: "Monthly Magazine", href: "/magazine" },
    { tn: "தொடர்புக்கு", en: "Contact Us", href: "/contact" },
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
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const displayLinks = navItems.filter(l => l.href !== "/");
    const midPoint = Math.ceil(displayLinks.length / 2);
    const leftLinks = displayLinks.slice(0, midPoint);
    const rightLinks = displayLinks.slice(midPoint);

    const linkCls =
        "text-neutral-800 text-[9px] lg:text-[10px] xl:text-xs font-bold uppercase tracking-wide hover:text-dravida-red transition-colors relative group py-2 whitespace-nowrap";
    const underline =
        "absolute bottom-0 left-0 w-0 h-0.5 bg-dravida-red transition-all duration-300 group-hover:w-full";

    return (
        <nav
            className={`fixed z-50 font-sans transition-all duration-500 inset-x-0 mx-auto ${scrolled
                    ? "top-0 w-full rounded-none border-b border-neutral-200 bg-white/95 backdrop-blur-lg shadow-md"
                    : "top-4 w-[98%] max-w-screen-2xl rounded-full border border-neutral-200/50 bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                }`}
        >
            <div className="px-3 md:px-6 py-2">
                <div className="flex h-12 md:h-14 items-center justify-between relative">

                    {/* Mobile: Hamburger only */}
                    <div className="md:hidden flex items-center gap-2 absolute right-0 z-20">
                        <button
                            className="p-1 text-neutral-900"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Left nav (desktop) */}
                    <div className="hidden md:flex items-center justify-end flex-1 gap-2 lg:gap-3 xl:gap-5 pr-3 xl:pr-6">
                        {leftLinks.map(link => (
                            <Link key={link.href} href={link.href} className={linkCls}>
                                {isTamil ? link.tn : link.en}
                                <span className={underline} />
                            </Link>
                        ))}
                    </div>

                    {/* Logo (centre) */}
                    <div className="flex-shrink-0 flex items-center z-10 md:mx-3">
                        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
                            <img
                                src="/logo.jpeg"
                                alt="திராவிட தலைமுறை"
                                className="h-9 md:h-11 lg:h-12 w-auto object-contain drop-shadow-md"
                            />
                            <span className="md:hidden font-extrabold text-[#991b1b] text-[12px] tracking-tight whitespace-nowrap leading-tight max-w-[120px]">
                                {isTamil ? "திராவிட தலைமுறை" : "DIRAVIDA THALAIMURAI"}
                            </span>
                        </Link>
                    </div>

                    {/* Right nav (desktop) */}
                    <div className="hidden md:flex items-center justify-start flex-1 gap-2 lg:gap-3 xl:gap-5 pl-3 xl:pl-6">
                        {rightLinks.map(link => (
                            <Link key={link.href} href={link.href} className={linkCls}>
                                {isTamil ? link.tn : link.en}
                                <span className={underline} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
                    <div className="p-4 flex flex-col gap-1 max-h-[72vh] overflow-y-auto">
                        {navItems.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-base font-bold text-neutral-800 py-3 px-4 rounded-xl hover:bg-red-50 hover:text-dravida-red transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {isTamil ? link.tn : link.en}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
