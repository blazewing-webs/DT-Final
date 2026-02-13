import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] flex items-center bg-neutral-900 text-white overflow-hidden">
            {/* Background Overlay - Replace with actual image later */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: 'url("/hero-bg.svg")' }} // Placeholder
            />

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="max-w-2xl space-y-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-dravida-red text-xs font-bold uppercase tracking-wider">
                        Featured
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                        The Fight for Social Justice Continues
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-200">
                        Understanding the core principles of the Dravidian movement and its relevance in today's political landscape.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/article?slug=social-justice-continues"
                            className="flex items-center gap-2 bg-dravida-red px-6 py-3 rounded-md font-medium hover:bg-red-700 transition"
                        >
                            Read Story <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/politics"
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-md font-medium hover:bg-white/20 transition"
                        >
                            More News
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
