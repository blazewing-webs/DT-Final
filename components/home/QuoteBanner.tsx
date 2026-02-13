"use client";

import { Quote } from "lucide-react";

export default function QuoteBanner() {
    return (
        <section className="bg-neutral-900 text-white py-12 md:py-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-dravida-red opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-dravida-red opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <div className="inline-flex justify-center mb-6">
                    <div className="bg-dravida-red/20 p-4 rounded-full">
                        <Quote className="h-8 w-8 text-dravida-red" />
                    </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold font-heading mb-6 leading-tight max-w-4xl mx-auto">
                    “மனிதனை மனிதனாக மதிக்காத எந்த சமுதாயமும் முன்னேறாது.”
                </h2>
                <cite className="text-xl md:text-2xl text-neutral-400 font-medium not-italic">
                    – தந்தை பெரியார்
                </cite>
            </div>
        </section>
    );
}
