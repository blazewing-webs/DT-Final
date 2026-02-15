"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    createdAt: any;
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const q = query(collection(db, "team_members"), orderBy("createdAt", "asc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as TeamMember[];
                setMembers(data);
            } catch (error) {
                console.error("Error fetching team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="எங்கள் குழு (Our Team)"
                description="The dedicated minds behind Dravida Thalaimurai."
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Team", href: "/team" },
                ]}
            />

            <section className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200 section-fade-in">
                        <Users className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Team info coming soon.</h3>
                        <p className="text-neutral-500">We are updating our contributors list.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {members.map((member) => (
                            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group section-scale-in">
                                <div className="p-8 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-50 mb-6 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                        {member.imageUrl ? (
                                            <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-300">
                                                <Users className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                                    <div className="text-dravida-red font-bold text-sm uppercase tracking-wider mb-4 px-3 py-1 bg-red-50 rounded-full">
                                        {member.role}
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                        {member.bio}
                                    </p>
                                </div>
                                <div className="h-2 bg-gradient-to-r from-dravida-red to-orange-500"></div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
