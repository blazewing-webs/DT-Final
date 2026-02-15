import Link from "next/link";
import Image from "next/image";
import { Clock, User, ImageOff } from "lucide-react"; // Added ImageOff
import { useState, useEffect } from "react";

// Temporary utility if not present
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

interface NewsCardProps {
    title: string;
    excerpt?: string;
    image: string;
    category: string;
    author?: string;
    date: string;
    href: string;
    variant?: "overlay" | "standard" | "horizontal" | "compact" | "sidebar";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function NewsCard({
    title,
    excerpt,
    image,
    category,
    author,
    date,
    href,
    variant = "standard",
    size = "md",
    className,
}: NewsCardProps) {
    const isOverlay = variant === "overlay";
    const isHorizontal = variant === "horizontal";
    const isCompact = variant === "compact";
    const isSidebar = variant === "sidebar";

    // State to handle image errors
    const [imgError, setImgError] = useState(false);
    const [imgSrc, setImgSrc] = useState(image);

    useEffect(() => {
        setImgSrc(image);
        setImgError(false);
    }, [image]);

    // Dynamic Title Sizes based on `size` prop
    const titleSizeClass = {
        sm: "text-xs md:text-sm leading-tight",
        md: "text-sm md:text-base leading-tight",
        lg: "text-lg md:text-2xl leading-tight",
    }[size];

    const paddingClass = {
        sm: "p-3 md:p-4",
        md: "p-4 md:p-5",
        lg: "p-5 md:p-6",
    }[size];

    // Helper to get Tamil category mainly
    const displayCategory = category ? category.split('(')[0].trim() : "News";

    // Reusable Image Component with Fallback
    const CardImage = () => {
        if (imgError || !imgSrc) {
            return (
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                        <ImageOff className="w-8 h-8" />
                        {/* Only show label on larger cards */}
                        {(size === "md" || size === "lg") && !isHorizontal && !isSidebar && (
                            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgError(true)}
                unoptimized // Ensure we don't use Next.js optimization for external images which might be blocked
            />
        );
    };

    if (isOverlay) {
        return (
            <Link href={href} className={classNames("group relative block overflow-hidden", className)}>
                <div className="relative h-full w-full bg-neutral-900">
                    <CardImage />
                    {/* Darker gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                </div>
                <div className={`absolute bottom-0 left-0 ${paddingClass} text-white w-full`}>
                    <span className="mb-2 inline-block bg-dravida-red px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {displayCategory}
                    </span>
                    <h3 className={`mb-2 font-bold drop-shadow-md ${titleSizeClass}`}>
                        {title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-300 font-medium opacity-90">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    if (isHorizontal) {
        return (
            <Link href={href} className={classNames("group flex gap-4 items-start", className)}>
                <div className="relative h-20 w-28 md:h-24 md:w-32 flex-shrink-0 overflow-hidden bg-neutral-100 rounded-md">
                    <CardImage />
                    {/* Small category badge on image for horizontal cards in magazine style */}
                    <div className="absolute bottom-0 left-0 bg-dravida-red text-white text-[10px] font-bold px-1.5 py-0.5 uppercase z-10">
                        {displayCategory}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm md:text-base font-bold text-neutral-900 leading-snug group-hover:text-dravida-red transition-colors mb-1 line-clamp-2">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-neutral-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    if (isSidebar) {
        return (
            <Link href={href} className={classNames("group flex items-start justify-between border-b border-neutral-100 py-3 last:border-0", className)}>
                <div className="flex flex-col pr-2">
                    <h3 className="text-sm font-bold text-neutral-900 leading-snug group-hover:text-dravida-red transition-colors line-clamp-3">
                        {title}
                    </h3>
                    <div className="mt-1 flex gap-2 text-[10px] text-neutral-400 uppercase">
                        <span className="text-dravida-red font-bold">{displayCategory}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Standard (Vertical Card)
    return (
        <Link href={href} className={classNames("group block h-full flex flex-col", className)}>
            <div className="relative aspect-[3/2] w-full overflow-hidden mb-3 bg-neutral-100 rounded-lg">
                <CardImage />
                <div className="absolute bottom-0 left-0 bg-dravida-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white z-10">
                    {displayCategory}
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <h3 className="mb-2 text-lg font-bold leading-tight text-neutral-900 group-hover:text-dravida-red transition-colors">
                    {title}
                </h3>
                {excerpt && (
                    <p className="mb-3 text-sm text-neutral-500 line-clamp-2 flex-1 leading-relaxed">
                        {excerpt}
                    </p>
                )}
                <div className="mt-auto flex items-center gap-3 text-xs text-neutral-400 font-bold uppercase tracking-wide">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
