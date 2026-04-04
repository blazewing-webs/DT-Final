"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const tnPolicies = [
    "உண்மை சரிபார்க்கப்பட்ட செய்திகளே வெளியிடப்படும்",
    "வெறுப்பு, வன்முறை, பாகுபாடு ஊக்குவிக்கும் செய்திகள் தவிர்க்கப்படும்",
    "திருத்தம் தேவைப்பட்டால் உடனடியாக செய்தி புதுப்பிக்கப்படும்",
    "கருத்து & செய்தி இரண்டும் தெளிவாக பிரிக்கப்பட்டு வழங்கப்படும்",
];

const enPolicies = [
    "Only verified and fact-checked news will be published",
    "Content that promotes hatred, violence, or discrimination will be avoided",
    "If corrections are required, updates will be made immediately",
    "Opinion and news will be clearly separated and presented transparently",
];

export default function EditorialPage() {
    const { isTamil } = useLanguage();

    return (
        <main className="min-h-screen font-sans bg-white">
            <Navbar />

            {/* Page Header */}
            <header className="pt-32 pb-14 bg-neutral-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e11d48 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative z-10">
                    <span className="text-dravida-red text-xs font-bold uppercase tracking-[0.3em]">
                        {isTamil ? "ஆசிரியர் கருத்து" : "Editorial Note"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2">
                        {isTamil ? (
                            <>ஆசிரியர் <span className="text-dravida-red">கருத்து</span></>
                        ) : (
                            <>Editorial <span className="text-dravida-red">Note</span></>
                        )}
                    </h1>
                </div>
            </header>

            <section className="py-20 bg-white min-h-[60vh]">
                <div className="container mx-auto px-6 max-w-3xl space-y-10">

                    {isTamil ? (
                        <>
                            {/* Tamil — Editorial Note */}
                            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                                className="bg-neutral-50 border-t-4 border-dravida-red rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-3xl">✍️</span>
                                    <h2 className="text-xl font-black text-neutral-900">ஆசிரியர் கருத்து</h2>
                                </div>
                                <div className="space-y-2 text-neutral-700 text-base leading-relaxed">
                                    <p>செய்தி என்பது தகவல் மட்டும் அல்ல.</p>
                                    <p>அது யாருக்காக, எதற்காக என்பதுதான் முக்கியம்.</p>
                                    <p className="pt-2">
                                        திராவிட தலைமுறை, அதிகாரத்தின் குரலாக அல்ல;<br />
                                        மக்களின் குரலாக செய்தியை வழங்கும்.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Tamil — Policy */}
                            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                                className="bg-neutral-50 border-t-4 border-amber-500 rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-3xl">📋</span>
                                    <h2 className="text-xl font-black text-neutral-900">எங்கள் ஆசிரியர் கொள்கை</h2>
                                </div>
                                <ul className="space-y-3">
                                    {tnPolicies.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-neutral-700 text-sm leading-relaxed">
                                            <span className="text-dravida-red mt-1 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            {/* English — Editorial Note */}
                            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                                className="bg-neutral-900 text-white border-t-4 border-dravida-red rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-3xl">✍️</span>
                                    <h2 className="text-xl font-black text-white">Editorial Note</h2>
                                </div>
                                <div className="space-y-2 text-neutral-300 text-base leading-relaxed">
                                    <p>News is not just information.</p>
                                    <p>What truly matters is for whom it is told and why it is told.</p>
                                    <p className="pt-2">
                                        Diravida Thalaimurai does not speak as the voice of power;<br />
                                        it delivers news as the voice of the people.
                                    </p>
                                </div>
                            </motion.div>

                            {/* English — Policy */}
                            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                                className="bg-neutral-900 text-white border-t-4 border-amber-500 rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-3xl">📋</span>
                                    <h2 className="text-xl font-black text-white">Our Editorial Policy</h2>
                                </div>
                                <ul className="space-y-3">
                                    {enPolicies.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                                            <span className="text-amber-400 mt-1 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}
