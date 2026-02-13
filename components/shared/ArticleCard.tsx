import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface ArticleCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    imageUrl?: string;
    slug: string;
}

export default function ArticleCard({ title, excerpt, date, category, imageUrl, slug }: ArticleCardProps) {
    return (
        <div className="group flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-neutral-200 relative overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-dravida-red text-white text-xs font-bold px-2 py-1 uppercase rounded">
                    {category}
                </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center text-neutral-500 text-xs mb-2 gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{date}</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-neutral-900 mb-2 group-hover:text-dravida-red transition-colors">
                    <Link href={`/article/${slug}`}>
                        {title}
                    </Link>
                </h3>
                <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-1">
                    {excerpt}
                </p>
                <Link
                    href={`/article/${slug}`}
                    className="text-dravida-red text-sm font-medium hover:underline mt-auto"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}
