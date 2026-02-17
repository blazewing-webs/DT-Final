"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Zap } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Ideology", href: "/#ideology" },
    { name: "History", href: "/#history" },
    { name: "News", href: "/news" },
    { name: "Magazines", href: "/magazine" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrolled = window.scrollY > 20; // 20px threshold
                    setScrolled(isScrolled);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter out Home (implied by logo)
    const filteredLinks = navLinks.filter(link => link.name !== "Home");

    // Split links into left and right
    const midPoint = Math.ceil(filteredLinks.length / 2);
    const leftLinks = filteredLinks.slice(0, midPoint);
    const rightLinks = filteredLinks.slice(midPoint);

    return (
        <nav
            // Changed positioning method: inset-x-0 mx-auto avoids transform jitters
            // Transition: smooth width and position matching
            className={`fixed z-50 font-sans transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) inset-x-0 mx-auto ${scrolled
                ? "top-0 w-full max-w-none rounded-none border-b border-neutral-200 bg-white/95 backdrop-blur-lg shadow-md"
                : "top-4 w-[95%] md:w-[98%] max-w-7xl rounded-full border border-neutral-200/50 bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                }`}
        >
            <div className={`px-4 md:px-8 transition-all duration-500 ${scrolled ? "py-2" : "py-2"}`}>
                <div className="flex h-12 md:h-14 items-center justify-between relative">

                    {/* Mobile Menu Button (Absolute Left on Mobile) */}
                    <button
                        className="lg:hidden absolute left-0 p-1 text-neutral-900"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Left Nav links (Desktop) */}
                    <div className="hidden lg:flex items-center justify-end flex-1 gap-4 xl:gap-6 pr-4 xl:pr-8 border-r border-transparent">
                        {leftLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-neutral-800 text-xs font-bold uppercase tracking-wide hover:text-dravida-red transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dravida-red transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center mx-auto lg:mx-4 z-10">
                        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300 relative">
                            {/* Logo reduced */}
                            <img src="/logo.jpeg" alt="Dravida Thalaimurai" className="h-10 md:h-12 w-auto object-contain drop-shadow-md" />
                        </Link>
                    </div>

                    {/* Right Nav links (Desktop) */}
                    <div className="hidden lg:flex items-center justify-start flex-1 gap-4 xl:gap-6 pl-4 xl:pl-8 border-l border-transparent">
                        {rightLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-neutral-800 text-xs font-bold uppercase tracking-wide hover:text-dravida-red transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dravida-red transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>


            {/* Mobile Menu Overlay */}
            {
                isOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-2 bg-white rounded-3xl shadow-2xl border border-neutral-100 p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            {navLinks.slice(1).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-bold text-neutral-800 py-3 px-4 rounded-xl hover:bg-neutral-50 hover:text-dravida-red transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/subscribe"
                                className="mt-2 text-center bg-neutral-900 text-white py-3 rounded-xl font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Subscribe Today
                            </Link>
                        </div>
                    </div>
                )
            }
        </nav >
    );
}
