import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
    title: string;
    href: string;
    children: React.ReactNode;
    className?: string; // Allow custom classes
}

export default function CategorySection({ title, href, children, className }: CategorySectionProps) {
    return (
        <section className={`py-6 ${className || ""}`}>
            <div className="mb-6 flex items-center justify-between border-b border-black pb-1">
                <div className="flex items-center gap-2">
                    <span className="text-dravida-red text-xl font-bold tracking-tighter">//</span>
                    <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">
                        {title}
                    </h2>
                </div>

                <Link
                    href={href}
                    className="flex items-center text-xs font-bold uppercase text-neutral-500 hover:text-dravida-red transition-colors"
                >
                    View All
                    <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
            </div>
            {children}
        </section>
    );
}
