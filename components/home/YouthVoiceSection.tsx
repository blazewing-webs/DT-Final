"use client";

import { Mic } from "lucide-react";

export default function YouthVoiceSection() {
    return (
        <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000)' }}>
            <div className="absolute inset-0 bg-black/70" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <Mic className="w-16 h-16 text-dravida-red mx-auto mb-8 animate-pulse" />
                <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
                    "இன்றைய இளைஞர்களே<br />நாளைய <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">தலைவர்கள்</span>"
                </h2>
                <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto italic font-serif">
                    எதிர்காலம் நம் கையில். வரலாறு படைக்க வாருங்கள்.
                </p>
            </div>
        </section>
    );
}
