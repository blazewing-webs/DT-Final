"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Loader2, Send, Users } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
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
    },
};

const emails = [
    { label: "News Tips", addr: "news@dravidthalaimurai.in" },
    { label: "Editorial", addr: "editor@dravidthalaimurai.in" },
    { label: "General", addr: "contact@dravidthalaimurai.in" },
];

export default function ContactPage() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { isTamil } = useLanguage();
    const t = isTamil ? content.tn : content.en;

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                setSettings(docSnap.exists() ? docSnap.data() : {
                    email: "contact@dravidthalaimurai.in",
                    phone: "+91 98765 43210",
                    address: "Chennai, Tamil Nadu, India"
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

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
                <div className="bg-dravida-red py-4">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <p className="text-white font-bold text-sm">{t.contactTitle}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
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
