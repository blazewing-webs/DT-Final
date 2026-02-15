"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Zap } from "lucide-react";

const navLinks = [
    { name: "முகப்பு", href: "/" }, // Home
    { name: "அரசியல்", href: "/politics" }, // Politics
    { name: "வரலாறு", href: "/history" }, // History
    { name: "சமூகம்", href: "/society" }, // Society
    { name: "பெண்கள்", href: "/women" }, // Women
    { name: "கல்வி", href: "/education" }, // Education
    { name: "இதழ்கள்", href: "/magazine" }, // Magazine
    { name: "குழு", href: "/team" }, // Team
    { name: "இளைஞர் அணி", href: "/youth-desk" }, // Youth Desk
    { name: "தொடர்புக்கு", href: "/contact" }, // Contact
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-md border-t border-b border-neutral-200 font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-12 md:h-14 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-1 text-neutral-900 mr-4"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Desktop Nav (Full Width) */}
                    <div className="hidden lg:flex items-center h-full gap-8">
                        {/* Home Icon/Link */}
                        {/* Logo */}
                        <Link href="/" className="h-full flex items-center py-2 transition-opacity hover:opacity-90">
                            <img src="/logo.jpeg" alt="Dravida Thalaimurai" className="h-full w-auto object-contain max-h-10" />
                        </Link>

                        {navLinks.slice(1).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-neutral-900 text-sm font-bold uppercase tracking-wide hover:text-dravida-red transition-colors py-2 relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dravida-red transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Flash News Ticker (Right Side Integration) - Removed static ticker */}

                    <button aria-label="Search" className="text-neutral-500 hover:text-dravida-red transition-colors border-l border-neutral-200 pl-4">
                        <Search className="h-4 w-4" />
                    </button>
                </div>
            </div>


            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="lg:hidden border-t border-neutral-200 bg-white fixed inset-x-0 bottom-0 top-12 z-40 overflow-y-auto">
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                            <Link
                                href="/"
                                className="py-3 border-b border-neutral-100"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/logo.jpeg" alt="Dravida Thalaimurai" className="h-8 w-auto object-contain" />
                            </Link>
                            {navLinks.slice(1).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-bold text-neutral-800 py-3 border-b border-neutral-100 hover:text-dravida-red hover:pl-2 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </nav >
    );
}
