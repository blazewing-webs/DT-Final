import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsCard from "@/components/news/NewsCard";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";

export default function WomenPage() {
    const { articles, loading } = useArticles("பெண்கள் நலம் (Women)", 20);

    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="பெண்கள் உரிமை மற்றும் நலம்"
                description="நீலகிரியில் பெண்களின் சுகாதாரம், தொழில் முனைவோர் மற்றும் சமூக நிலையை மேம்படுத்துதல்."
                breadcrumb={[
                    { label: "முகப்பு", href: "/" },
                    { label: "பெண்கள்", href: "/women" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        <p>செய்திகள் விரைவில்...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <NewsCard
                                key={article.id}
                                title={article.title}
                                excerpt={article.excerpt}
                                image={article.image}
                                category={article.category}
                                author={article.author}
                                date={article.date}
                                href={`/article?slug=${article.slug}`}
                                variant="standard"
                                className="h-full"
                            />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
