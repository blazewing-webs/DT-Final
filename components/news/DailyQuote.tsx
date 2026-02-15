import { Quote } from "lucide-react";

interface DailyQuoteProps {
    quote: string;
    author: string;
    className?: string;
}

export default function DailyQuote({ quote, author, className }: DailyQuoteProps) {
    return (
        <div className={`relative h-[500px] lg:h-full w-full overflow-hidden group rounded-xl border border-amber-400/40 shadow-lg ${className}`}>
            {/* Liquid Background (Light & Golden) */}
            <div className="absolute inset-0 bg-neutral-50">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-yellow-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70" />
                <div className="absolute top-[20%] right-[20%] w-[60%] h-[60%] bg-yellow-100/60 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-60" />
                <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gold-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-1000 opacity-60" />
            </div>

            {/* Glass Card Overlay (Light) */}
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-md border border-white/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]" />

            {/* Extra Shine/Reflection */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-15 transform -rotate-12" />

            {/* Content Container */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center">

                {/* Floating Icon (Dark on Light) */}
                <div className="mb-8 p-4 rounded-2xl bg-white/60 border border-white/80 shadow-lg backdrop-blur-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Quote size={32} className="text-amber-600 fill-amber-600/20" />
                </div>

                {/* Quote Text (Dark) */}
                <h3 className="text-xl md:text-2xl font-bold text-neutral-800 mb-8 leading-relaxed font-serif tracking-wide drop-shadow-sm relative">
                    <span className="text-amber-600/20 text-6xl font-serif absolute -top-8 -left-4 font-black">“</span>
                    {quote}
                    <span className="text-amber-600/20 text-6xl font-serif absolute -bottom-10 -right-4 font-black">”</span>
                </h3>

                {/* Separator */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-6 rounded-full" />

                {/* Author */}
                <p className="text-neutral-700 text-sm font-bold uppercase tracking-[0.25em] drop-shadow-sm">
                    {author}
                </p>

                {/* Glass Tag (Dark Text) */}
                <span className="mt-8 text-[11px] font-bold text-neutral-600 bg-white/50 px-4 py-1.5 rounded-full border border-white/60 backdrop-blur-md uppercase tracking-widest shadow-md hover:bg-white/70 transition-colors">
                    இன்றைய சிந்தனை
                </span>
            </div>

            {/* CSS Animation for Blobs */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 8s infinite ease-in-out;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
