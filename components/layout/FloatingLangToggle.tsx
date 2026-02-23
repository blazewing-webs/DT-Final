"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingLangToggle() {
    const { isTamil, setLang } = useLanguage();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-1">
            <button
                onClick={() => setLang(isTamil ? "en" : "tn")}
                aria-label={isTamil ? "Switch to English" : "Switch to Tamil"}
                title={isTamil ? "Switch to English" : "தமிழுக்கு மாற்று"}
                className="flex items-center rounded-full shadow-lg border-2 border-dravida-red bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_16px_rgba(220,38,38,0.35)] hover:scale-105 active:scale-95"
                style={{ padding: 2 }}
            >
                {/* த segment */}
                <span className={`px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full text-[11px] md:text-xs font-black transition-all duration-300 ${isTamil ? "bg-dravida-red text-white" : "bg-transparent text-neutral-400"
                    }`}>
                    த
                </span>

                <span className="w-px h-4 bg-dravida-red/25" />

                {/* EN segment */}
                <span className={`px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full text-[11px] md:text-xs font-black transition-all duration-300 ${!isTamil ? "bg-dravida-red text-white" : "bg-transparent text-neutral-400"
                    }`}>
                    EN
                </span>
            </button>

            {/* Tiny label — hidden on very small screens */}
            <p className="hidden sm:block text-[9px] text-neutral-400 font-semibold tracking-wide">
                {isTamil ? "மொழி மாற்று" : "Language"}
            </p>
        </div>
    );
}
