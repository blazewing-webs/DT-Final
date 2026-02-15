"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, FileText, Eye, TrendingUp, BookOpen, Quote, Loader2 } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalArticles: 0,
        totalMagazines: 0,
        totalTeamMembers: 0,
        totalQuotes: 0
    });
    const [articlesData, setArticlesData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [recentArticles, setRecentArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for Articles
        const articlesQuery = query(collection(db, "articles"), orderBy("createdAt", "desc"));
        const unsubscribeArticles = onSnapshot(articlesQuery, (snapshot) => {
            const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Update Stats
            setStats(prev => ({ ...prev, totalArticles: articles.length }));
            setRecentArticles(articles.slice(0, 5));

            // Process Category Data for Pie Chart
            const categoryCounts: { [key: string]: number } = {};
            articles.forEach((article: any) => {
                const category = article.category || "Uncategorized";
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });

            const pieData = Object.keys(categoryCounts).map(key => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                value: categoryCounts[key]
            }));
            setCategoryData(pieData);

            // Process Activity Data (Last 7 Days) for Bar Chart
            const last7Days: { [key: string]: number } = {};
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const day = new Date(today);
                day.setDate(today.getDate() - i);
                const dateString = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                last7Days[dateString] = 0;
            }

            articles.forEach((article: any) => {
                if (article.createdAt) {
                    const date = article.createdAt.toDate ? article.createdAt.toDate() : new Date(article.createdAt);
                    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    if (last7Days.hasOwnProperty(dateString)) {
                        last7Days[dateString]++;
                    }
                }
            });

            const barData = Object.keys(last7Days).map(key => ({
                date: key,
                articles: last7Days[key]
            }));
            setArticlesData(barData);
            setLoading(false);
        });

        // Real-time listeners for other collections
        const unsubscribeMagazines = onSnapshot(collection(db, "magazines"), (snapshot) => {
            setStats(prev => ({ ...prev, totalMagazines: snapshot.size }));
        });

        const unsubscribeTeam = onSnapshot(collection(db, "team_members"), (snapshot) => {
            setStats(prev => ({ ...prev, totalTeamMembers: snapshot.size }));
        });

        const unsubscribeQuotes = onSnapshot(collection(db, "quotes"), (snapshot) => {
            setStats(prev => ({ ...prev, totalQuotes: snapshot.size }));
        });

        return () => {
            unsubscribeArticles();
            unsubscribeMagazines();
            unsubscribeTeam();
            unsubscribeQuotes();
        };
    }, []);

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500">Real-time overview of your content.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Articles" value={stats.totalArticles.toString()} icon={FileText} color="bg-blue-500" />
                <StatCard title="Total Magazines" value={stats.totalMagazines.toString()} icon={BookOpen} color="bg-green-500" />
                <StatCard title="Team Members" value={stats.totalTeamMembers.toString()} icon={Users} color="bg-purple-500" />
                <StatCard title="Total Quotes" value={stats.totalQuotes.toString()} icon={Quote} color="bg-dravida-red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Activity Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                    <h2 className="text-xl font-bold mb-6 text-neutral-800">Article Activity (Last 7 Days)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={articlesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="articles" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                    <h2 className="text-xl font-bold mb-6 text-neutral-800">Category Distribution</h2>
                    <div className="h-[400px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "20px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mt-8">
                <h2 className="text-xl font-bold mb-4 text-neutral-800">Recent Articles</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-100">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Title</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Author</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentArticles.map((article: any) => (
                                <tr key={article.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                                    <td className="py-3 px-4 text-sm font-medium text-neutral-900 truncate max-w-[200px]">{article.title}</td>
                                    <td className="py-3 px-4 text-sm text-neutral-600">
                                        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded-md text-xs font-bold uppercase">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-neutral-600">{article.author}</td>
                                    <td className="py-3 px-4 text-sm text-neutral-500">
                                        {article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white shadow-sm`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-neutral-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-neutral-900">{value}</p>
            </div>
        </div>
    );
}
