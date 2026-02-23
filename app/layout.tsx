import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/admin/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import FloatingLangToggle from "@/components/layout/FloatingLangToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "திராவிட தலைமுறை | Diravida Thalaimurai",
    description: "சிந்திக்கும் இளம் குரல் | சமத்துவத்தின் பாதை — The Thinking Young Voice | The Path of Equality",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ta" translate="no" className="notranslate">
            <head>
                <meta name="google" content="notranslate" />
            </head>
            <body className={cn(inter.variable, outfit.variable, "font-sans antialiased bg-white text-neutral-900")}>
                <LanguageProvider>
                    <FloatingLangToggle />
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
