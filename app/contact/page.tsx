"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Loader2, Send, Users, Search, UserCheck, ChevronDown } from "lucide-react";
import { doc, getDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
    tn: {
        pageTitle: "தொடர்பு",
        tagline: "கருத்து • கேள்வி • இணைவு",
        callTitle: "சிந்திக்கத் தயாரா?",
        callBody: "மாற்றத்தை உருவாக்க விரும்புகிறீர்களா? இன்றே திராவிட தலைமுறையில் இணைவோம். உண்மை, ஆதாரம் உள்ள செய்திகளை மட்டுமே அனுப்பவும்.",
        joinTitle: "இணைய வழிகள்:",
        joins: [
            "இந்த சிந்தனையில் நீங்களும் பங்கெடுக்கலாம்",
            "Volunteer ஆக இணைய",
            "உங்கள் கருத்துகளை பகிர",
            "கட்டுரை / கவிதை அனுப்ப",
        ],
        tagline2: "📩 Together, let us build a rational society.",
        contactTitle: "தொடர்பு கொள்ள",
        emailsLabel: "மின்னஞ்சல்",
        formTitle: "எங்களுக்கு எழுதுங்கள்",
        nameLabel: "பெயர்",
        namePlaceholder: "உங்கள் பெயர்",
        emailLabel: "மின்னஞ்சல்",
        msgLabel: "செய்தி",
        msgPlaceholder: "உங்கள் கருத்து / கேள்வி",
        submit: "அனுப்புக",
        reportersTitle: "மாவட்ட வாரியான செய்தியாளர்கள்",
        searchPlaceholder: "பெயர் அல்லது மாவட்டத்தைத் தேடுங்கள்...",
        reporterDistrict: "மாவட்டம்",
        reporterPhone: "அழைக்க",
        noReporters: "செய்தியாளர்கள் இல்லை.",
        viewAllReporters: "அனைத்து செய்தியாளர்களையும் காண்க",
    },
    en: {
        pageTitle: "Contact / Join Us",
        tagline: "Ideas • Voices • Movement",
        callTitle: "Ready to think?",
        callBody: "Do you want to create change? Join Diravida Thalaimurai today. We welcome news tips and submissions only with facts and credible sources.",
        joinTitle: "You can:",
        joins: [
            "Be part of this movement",
            "Join us as a Volunteer",
            "Share your views and ideas",
            "Submit Articles / Essays / Poems",
            "Contribute to writing, art, and media",
        ],
        tagline2: "📩 Together, let us build a rational society.",
        contactTitle: "Get in Touch",
        emailsLabel: "Email",
        formTitle: "Write to Us",
        nameLabel: "Name",
        namePlaceholder: "Your Name",
        emailLabel: "Email",
        msgLabel: "Message",
        msgPlaceholder: "Your thoughts / questions",
        submit: "Send Message",
        reportersTitle: "District wise Reporters",
        searchPlaceholder: "Search by name or district...",
        reporterDistrict: "District",
        reporterPhone: "Call",
        noReporters: "No reporters found.",
        viewAllReporters: "View All District Reporters",
    },
};

const emails = [
    { label: "News Tips", addr: "news@dravidthalaimurai.in" },
    { label: "Editorial", addr: "editor@dravidthalaimurai.in" },
    { label: "General", addr: "contact@dravidthalaimurai.in" },
];

export interface Reporter {
    id: string;
    name: string;
    district: string;
    phone: string;
    email?: string;
    image?: string;
}

export default function ContactPage() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [reporters, setReporters] = useState<Reporter[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedDistricts, setExpandedDistricts] = useState<string[]>([]);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Settings
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                setSettings(docSnap.exists() ? docSnap.data() : {
                    email: "contact@dravidthalaimurai.in",
                    phone: "+91 98765 43210",
                    address: "Chennai, Tamil Nadu, India"
                });

                // Fetch Reporters
                const q = query(collection(db, "reporters"), orderBy("district", "asc"));
                const querySnapshot = await getDocs(q);
                const reportersList: Reporter[] = [];
                querySnapshot.forEach((doc) => {
                    reportersList.push({ id: doc.id, ...doc.data() } as Reporter);
                });

                // Fallback if empty (for initial setup)
                if (reportersList.length === 0) {
                    setReporters([
                        { id: "1", name: "S. Kumaran", district: "Chennai", phone: "+91 98765 00000", email: "kumaran@dravida.com" },
                        { id: "2", name: "M. Abdul", district: "Madurai", phone: "+91 98765 00001", email: "abdul@dravida.com" },
                        { id: "3", name: "R. Priya", district: "Coimbatore", phone: "+91 98765 00002", email: "priya@dravida.com" },
                        { id: "4", name: "J. David", district: "Trichy", phone: "+91 98765 00003", email: "david@dravida.com" },
                        { id: "5", name: "K. Selvam", district: "Salem", phone: "+91 98765 00004", email: "selvam@dravida.com" },
                        { id: "6", name: "A. Rajesh", district: "Chennai", phone: "+91 98765 00005", email: "rajesh@dravida.com" },
                    ]);
                } else {
                    setReporters(reportersList);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter and Group Reporters
    const filteredReporters = useMemo(() => {
        return reporters.filter(r =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.district.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [reporters, searchQuery]);

    const groupedReporters = useMemo(() => {
        return filteredReporters.reduce((acc, reporter) => {
            if (!acc[reporter.district]) acc[reporter.district] = [];
            acc[reporter.district].push(reporter);
            return acc;
        }, {} as Record<string, Reporter[]>);
    }, [filteredReporters]);

    const districts = useMemo(() => {
        return Object.keys(groupedReporters).sort();
    }, [groupedReporters]);

    // Automatically expand districts if searching, collapse if cleared
    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setExpandedDistricts(districts);
        } else {
            setExpandedDistricts([]);
        }
    }, [searchQuery, districts]);

    const toggleDistrict = (district: string) => {
        setExpandedDistricts(prev =>
            prev.includes(district)
                ? prev.filter(d => d !== district)
                : [...prev, district]
        );
    };

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            {/* Hero Banner */}
            <div className="pt-28 pb-0 bg-neutral-900 text-white">
                <div className="container mx-auto px-6 max-w-5xl py-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dravida-red/20 border border-dravida-red/40 text-dravida-red font-bold text-xs uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-dravida-red animate-pulse" />
                        {t.tagline}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">{t.pageTitle}</h1>
                    <p className="text-xl font-bold text-amber-400 mb-2">{t.callTitle}</p>
                    <p className="text-neutral-300 max-w-2xl mb-8">{t.callBody}</p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {t.joins.map((j, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-neutral-300 flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-dravida-red" /> {j}
                            </div>
                        ))}
                    </div>
                    <p className="text-amber-400 font-bold">{t.tagline2}</p>
                </div>
            </div>

            {/* Reporters Section - Accordion Style (Now at Top) */}
            <section className="bg-white border-b border-neutral-200 py-16">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-neutral-900 mb-2">{t.reportersTitle}</h2>
                            <div className="inline-block px-4 py-1.5 bg-neutral-100 rounded-full text-xs font-black text-neutral-500 uppercase tracking-widest">
                                {t.viewAllReporters}
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-dravida-red focus:outline-none transition font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {districts.length > 0 ? (
                        <div className="space-y-4">
                            {districts.map(district => {
                                const isOpen = expandedDistricts.includes(district);
                                return (
                                    <div key={district} className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'bg-neutral-50 border-neutral-200 shadow-sm' : 'bg-white border-neutral-100 hover:border-dravida-red/30'}`}>
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleDistrict(district)}
                                            className="w-full p-6 flex items-center justify-between text-left group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${isOpen ? 'bg-dravida-red text-white' : 'bg-neutral-100 text-neutral-400 group-hover:text-dravida-red group-hover:bg-dravida-red/5'}`}>
                                                    <MapPin className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-neutral-900">{district}</h3>
                                                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                                        {groupedReporters[district].length} {isTamil ? "செய்தியாளர்கள்" : "Reporters"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'bg-white rotate-180 text-dravida-red shadow-sm' : 'bg-neutral-50 text-neutral-400 group-hover:text-dravida-red'}`}>
                                                <ChevronDown className="w-5 h-5" />
                                            </div>
                                        </button>

                                        {/* Accordion Content */}
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-8 px-6' : 'max-h-0 opacity-0 px-6'}`}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-neutral-200/60">
                                                {groupedReporters[district].map(reporter => (
                                                    <div key={reporter.id} className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-dravida-red transition-all group/card">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-10 h-10 bg-neutral-50 flex items-center justify-center rounded-lg border border-neutral-100 text-neutral-400 group-hover/card:text-dravida-red group-hover/card:bg-dravida-red/5 transition-colors">
                                                                <UserCheck className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-neutral-900 group-hover/card:text-dravida-red transition-colors text-sm">{reporter.name}</h4>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="space-y-2 mt-auto pt-2 border-t border-neutral-100">
                                                            <div className="flex items-center gap-2 text-neutral-600 hover:text-dravida-red transition-colors">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                <a href={`tel:${reporter.phone}`} className="text-[13px] font-bold">{reporter.phone}</a>
                                                            </div>
                                                            {reporter.email && (
                                                                <div className="flex items-center gap-2 text-neutral-600 hover:text-dravida-red transition-colors">
                                                                    <Mail className="w-3.5 h-3.5" />
                                                                    <a href={`mailto:${reporter.email}`} className="text-[13px] font-bold truncate">{reporter.email}</a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-300">
                            <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                            <p className="text-neutral-500 font-bold">{t.noReporters}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Red CTA Bar */}
            <div className="bg-dravida-red py-4">
                <div className="container mx-auto px-6 max-w-5xl">
                    <p className="text-white font-bold text-sm tracking-wider uppercase">{t.contactTitle}</p>
                </div>
            </div>

            {/* Main Contact Content */}
            <section className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Email categories */}
                        <div>
                            <h3 className="text-lg font-black text-neutral-900 mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-dravida-red" /> {t.emailsLabel}
                            </h3>
                            <div className="space-y-3">
                                {emails.map((e, i) => (
                                    <div key={i} className="flex items-center justify-between bg-white rounded-xl p-4 border border-neutral-200 hover:border-dravida-red transition-colors group">
                                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{e.label}</span>
                                        <a href={`mailto:${e.addr}`} className="text-sm font-bold text-neutral-800 group-hover:text-dravida-red transition-colors">
                                            {e.addr}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Address / Phone from settings */}
                        {loading ? (
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {settings?.phone && (
                                    <div className="flex items-center gap-4 text-neutral-600">
                                        <div className="w-10 h-10 bg-dravida-red/10 flex items-center justify-center rounded-full text-dravida-red shrink-0">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <a href={`tel:${settings.phone}`} className="hover:text-dravida-red transition-colors">{settings.phone}</a>
                                    </div>
                                )}
                                {settings?.address && (
                                    <div className="flex items-start gap-4 text-neutral-600">
                                        <div className="w-10 h-10 bg-dravida-red/10 flex items-center justify-center rounded-full text-dravida-red shrink-0">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <span>{settings.address}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                        <h3 className="text-xl font-black text-neutral-900 mb-6">{t.formTitle}</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">{t.nameLabel}</label>
                                <input type="text" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-dravida-red focus:outline-none transition" placeholder={t.namePlaceholder} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">{t.emailLabel}</label>
                                <input type="email" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-dravida-red focus:outline-none transition" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-1">{t.msgLabel}</label>
                                <textarea rows={5} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-dravida-red focus:outline-none transition resize-none" placeholder={t.msgPlaceholder} />
                            </div>
                            <button type="submit" className="w-full bg-dravida-red text-white font-black py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" /> {t.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
