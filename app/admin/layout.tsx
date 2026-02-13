"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/admin/AuthContext"; // Ensure AuthContext is exported correctly
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

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
        return null; // or a loading spinner while redirecting
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex font-sans">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
