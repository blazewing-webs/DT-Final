import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
    const currentDate = new Date().toLocaleDateString('ta-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-[#111] text-white py-2 text-xs font-sans border-b border-neutral-800 hidden md:block">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Date */}
                <div className="text-neutral-400 font-medium">
                    {currentDate}
                </div>

                {/* Socials & Links */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 border-r border-neutral-700 pr-4">
                        <Link href="#" className="hover:text-dravida-red transition-colors"><Facebook className="h-3.5 w-3.5" /></Link>
                        <Link href="#" className="hover:text-dravida-red transition-colors"><Twitter className="h-3.5 w-3.5" /></Link>
                        <Link href="#" className="hover:text-dravida-red transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                        <Link href="#" className="hover:text-dravida-red transition-colors"><Youtube className="h-3.5 w-3.5" /></Link>
                    </div>
                    <div className="flex gap-4 font-bold text-neutral-300">
                        <Link href="/about" className="hover:text-white transition-colors">எங்களை பற்றி</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">தொடர்புக்கு</Link>
                        <Link href="/login" className="hover:text-white transition-colors">உள்நுழைய</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
