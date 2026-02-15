"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/admin/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dravida-red"></div>
            </div>
        );
    }

    // Determine if we should show the sidebar (hide on login page)
    const isLoginPage = pathname === "/admin/login";

    if (!user && !isLoginPage) {
        return null;
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col lg:flex-row font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-neutral-200 p-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dravida-red rounded-full"></div>
                    <span className="font-bold text-lg tracking-wide text-neutral-900">DT Admin</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
