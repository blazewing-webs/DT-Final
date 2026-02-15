"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Database, BookOpen, Clock, Book, CheckCircle, Quote, HelpCircle, Youtube, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: Database },
    { name: "Magazines", href: "/admin/magazines", icon: BookOpen },
    { name: "Live Timeline", href: "/admin/timeline", icon: Clock },
    { name: "History (Milestones)", href: "/admin/milestones", icon: Book },
    { name: "Books", href: "/admin/books", icon: Book },
    { name: "Fact Check", href: "/admin/fact-check", icon: CheckCircle },
    { name: "Youth Desk", href: "/admin/youth-desk", icon: Users },
    { name: "Quotes", href: "/admin/quotes", icon: Quote },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "YouTube", href: "/admin/youtube", icon: Youtube },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            <aside className={`w-64 bg-neutral-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-dravida-red rounded-full"></div>
                        <span className="font-bold text-lg tracking-wide">DT Admin</span>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="lg:hidden text-neutral-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose} // Close sidebar on link click (mobile)
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-dravida-red text-white font-bold"
                                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-800">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
