"use client";

import { Target, Shield, Globe, BookOpen } from "lucide-react";

export default function DreamSection() {
    const dreams = [
        { icon: <Target className="w-8 h-8" />, title: "சமத்துவ சமுதாயம்", desc: "சாதி, மத பேதமற்ற சம உரிமை கொண்ட சமூகம்." },
        { icon: <Shield className="w-8 h-8" />, title: "பெண் விடுதலை", desc: "பெண்களுக்கு சம உரிமை, கல்வி மற்றும் பாதுகாப்பு." },
        { icon: <Globe className="w-8 h-8" />, title: "மாநில சுயாட்சி", desc: "மாநில உரிமைகள் மற்றும் அதிகார பரவல்." },
        { icon: <BookOpen className="w-8 h-8" />, title: "அனைவருக்கும் கல்வி", desc: "தரமான, இலவச மற்றும் அறிவியல் பூர்வமான கல்வி." },
    ];

    return (
        <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">எங்கள் <span className="text-dravida-red">கனவு</span></h2>
                    <p className="text-neutral-400 text-lg">
                        எதிர்காலத் தமிழகம் எப்படி இருக்க வேண்டும் என்ற எங்கள் தொலைநோக்கு பார்வை.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dreams.map((item, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-dravida-red hover:border-dravida-red transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-xl bg-neutral-700/50 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-neutral-400 group-hover:text-white/90 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
