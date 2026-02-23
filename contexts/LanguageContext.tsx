"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "tn" | "en";

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    isTamil: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "tn",
    setLang: () => { },
    isTamil: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>("tn");

    // On first mount, restore saved preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("dt-lang") as Lang;
        if (saved === "en" || saved === "tn") {
            setLangState(saved);
        }
    }, []);

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem("dt-lang", newLang);
    };

    // Always render the Provider — never skip it
    return (
        <LanguageContext.Provider value={{ lang, setLang, isTamil: lang === "tn" }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);

