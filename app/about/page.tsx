"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DisclaimerPage() {
    const { isTamil } = useLanguage();

    return (
        <main className="min-h-screen font-sans bg-neutral-900 selection:bg-dravida-red selection:text-white">
            <Navbar />

            {/* Content Section */}
            <div className="pt-40 pb-24 px-6 relative overflow-hidden flex flex-col justify-center items-center min-h-[calc(100vh-100px)]">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-dravida-red rounded-full blur-[160px]" />
                    <div className="absolute bottom-20 left-0 w-80 h-80 bg-neutral-100/10 rounded-full blur-[140px]" />
                </div>

                <div className="container mx-auto max-w-3xl relative z-10 w-full">
                    <motion.div
                        key={isTamil ? "tn" : "en"}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-center w-full"
                    >
                        <div className="flex justify-center mb-10">
                            <div className="bg-dravida-red/10 p-5 rounded-full border border-dravida-red/20">
                                <ShieldAlert className="w-10 h-10 text-dravida-red" />
                            </div>
                        </div>

                        {isTamil ? (
                            /* Tamil Section */
                            <div className="animate-in fade-in zoom-in-95 duration-700">
                                <h1 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">
                                    பொறுப்புத் துறப்பு
                                </h1>
                                <div className="space-y-6">
                                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-medium">
                                        இந்த இணையதளத்தில் வெளியிடப்படும் கருத்துகள்,
                                    </p>
                                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-medium">
                                        அந்த எழுத்தாளரின் தனிப்பட்ட கருத்தாக இருக்கலாம்.
                                    </p>
                                    <p className="text-2xl md:text-3xl text-white leading-relaxed font-black pt-6">
                                        திராவிட தலைமுறை எந்த சட்டப்பொறுப்பையும் ஏற்காது.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* English Section */
                            <div className="animate-in fade-in zoom-in-95 duration-700">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight uppercase">
                                    Disclaimer
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-medium">
                                        The views and opinions expressed on this website<br className="hidden md:block" />
                                        are solely those of the respective authors.
                                    </p>
                                    <p className="text-2xl md:text-3xl text-white leading-relaxed font-black pt-6">
                                        Diravida Thalaimurai does not accept any legal responsibility<br className="hidden md:block" />
                                        for such individual opinions or expressions.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
