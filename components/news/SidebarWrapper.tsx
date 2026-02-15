"use client";

import { useArticles } from "@/hooks/useArticles";
import Sidebar from "@/components/news/Sidebar";

export default function SidebarWrapper() {
    const { articles: sidebarArticles, loading } = useArticles(undefined, 5);

    if (loading) return <div className="p-4 bg-neutral-50 rounded-lg animate-pulse h-64"></div>;

    return <Sidebar title="புதிய செய்திகள் (Latest News)" articles={sidebarArticles} />;
}
