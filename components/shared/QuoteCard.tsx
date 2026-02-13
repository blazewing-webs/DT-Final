interface QuoteCardProps {
    quote: string;
    author: string;
    imageUrl?: string;
}

export default function QuoteCard({ quote, author, imageUrl }: QuoteCardProps) {
    return (
        <div className="bg-neutral-100 p-8 rounded-xl border-l-4 border-dravida-red shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                {imageUrl && (
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-neutral-300">
                        {/* Replace with Next/Image later */}
                        <img src={imageUrl} alt={author} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="text-center md:text-left">
                    <p className="text-xl md:text-2xl font-serif italic text-neutral-800 mb-4">
                        "{quote}"
                    </p>
                    <p className="text-dravida-red font-bold uppercase tracking-wide">
                        — {author}
                    </p>
                </div>
            </div>
        </div>
    );
}
