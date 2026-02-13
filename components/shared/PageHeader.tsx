import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumb: { label: string; href: string }[];
}

export default function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
    return (
        <div className="bg-neutral-900 text-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <nav className="flex items-center text-sm text-neutral-400 mb-4">
                    <Link href="/" className="hover:text-white transition-colors">
                        முகப்பு
                    </Link>
                    {breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2" />
                            {index === breadcrumb.length - 1 ? (
                                <span className="text-white font-medium">{item.label}</span>
                            ) : (
                                <Link href={item.href} className="hover:text-white transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
                <h1 className="text-2xl md:text-4xl font-bold font-heading mb-4">{title}</h1>
                {description && (
                    <p className="text-lg text-neutral-300 max-w-2xl">{description}</p>
                )}
            </div>
        </div>
    );
}
