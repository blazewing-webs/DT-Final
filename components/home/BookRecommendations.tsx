import Link from "next/link";
import { Book } from "lucide-react";

export default function BookRecommendations() {
    const books = [
        {
            title: "பெண்ணிய சிந்தனைகள்",
            author: "தந்தை பெரியார்",
            img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", // Placeholder
        },
        {
            title: "அரசியல் சிந்தனைகள்",
            author: "பேரறிஞர் அண்ணா",
            img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400", // Placeholder
        },
        {
            title: "சமூக நீதி கட்டுரைகள்",
            author: "டாக்டர் கலைஞர்",
            img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400", // Placeholder
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900 font-heading mb-3">நூல்கள் பரிந்துரை</h2>
                        <p className="text-neutral-500">அறிவே ஆயுதம். சமுகத்தைப் புரிந்து கொள்ள சில அடிப்படை நூல்கள்.</p>
                    </div>
                    <Link href="/books" className="text-dravida-red font-bold hover:text-black transition-colors flex items-center gap-2">
                        அனைத்தையும் காண்க <Book className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {books.map((book, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-6 hover:shadow-md transition-shadow group">
                            <div className="h-24 w-16 bg-neutral-200 rounded shrink-0 overflow-hidden relative shadow-inner">
                                {/* Placeholder Book Cover */}
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600">
                                    <span className="text-xs text-white p-1 text-center leading-tight">{book.title}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-dravida-red transition-colors mb-1">{book.title}</h3>
                                <p className="text-sm text-neutral-500">எழுதியவர்:</p>
                                <p className="font-medium text-neutral-700">{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
