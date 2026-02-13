"use client";

import { Users, FileText, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500">Welcome back, Admin.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Articles" value="124" icon={FileText} color="bg-blue-500" />
                <StatCard title="Total Views" value="45.2k" icon={Eye} color="bg-green-500" />
                <StatCard title="Active Users" value="12" icon={Users} color="bg-purple-500" />
                <StatCard title="Growth" value="+12%" icon={TrendingUp} color="bg-dravida-red" />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Articles</h2>
                <div className="text-neutral-400 text-center py-12">
                    <p>Loading articles from Firestore...</p>
                    <p className="text-sm mt-2">(Configure Firebase to see real data)</p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-neutral-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-neutral-900">{value}</p>
            </div>
        </div>
    );
}
