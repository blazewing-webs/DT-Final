import NewsCard from "./NewsCard";

interface Article {
    id: string;
    title: string;
    image: string;
    category: string;
    date: string;
    slug: string;
}

interface SidebarProps {
    title: string;
    articles: Article[];
    className?: string;
}

export default function Sidebar({ title, articles, className }: SidebarProps) {
    return (
        <div className={`bg-neutral-50 p-6 rounded-lg ${className || ""}`}>
            <div className="mb-4 pb-2 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-dravida-red pl-3">
                    {title}
                </h3>
            </div>
            <div className="flex flex-col gap-4">
                {articles.map((article, index) => (
                    <div key={article.id} className="flex gap-4 items-start group cursor-pointer">
                        <div className="text-3xl font-bold text-neutral-200 group-hover:text-dravida-red transition-colors">
                            {index + 1}
                        </div>
                        <NewsCard
                            title={article.title}
                            image={article.image}
                            category={article.category}
                            date={article.date}
                            href={`/article?slug=${article.slug}`}
                            variant="sidebar" // Using 'sidebar' variant
                            className="flex-1 !border-b-0 !py-0" // Override styles if needed
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
