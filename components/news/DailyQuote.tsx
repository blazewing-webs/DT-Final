import { Quote } from "lucide-react";

interface DailyQuoteProps {
    quote: string;
    author: string;
    className?: string;
}

export default function DailyQuote({ quote, author, className }: DailyQuoteProps) {
    return (
        <div className={`relative h-full w-full bg-[#111] p-6 flex flex-col justify-center items-center text-center overflow-hidden group ${className}`}>
            {/* Background Pattern/Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dravida-red to-transparent opacity-80" />
            <div className="absolute -bottom-10 -right-10 text-neutral-800 opacity-20 transform -rotate-12 transition-transform duration-700 group-hover:scale-110">
                <Quote size={120} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 text-dravida-red bg-white/5 p-3 rounded-full backdrop-blur-sm border border-white/10">
                    <Quote size={24} className="fill-current" />
                </div>

                <h3 className="text-white text-lg md:text-xl font-bold font-serif italic mb-4 leading-relaxed tracking-wide">
                    "{quote}"
                </h3>

                <div className="w-12 h-0.5 bg-dravida-red mb-3" />

                <p className="text-neutral-400 text-xs md:text-sm font-bold uppercase tracking-widest">
                    {author}
                </p>

                <span className="mt-4 text-[10px] text-neutral-600 uppercase tracking-wider border border-neutral-800 px-2 py-1 rounded">
                    இன்றைய சிந்தனை
                </span>
            </div>
        </div>
    );
}
