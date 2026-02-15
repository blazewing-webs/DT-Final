"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Loader2 } from "lucide-react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BookItem {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
}

export default function BookRecommendations() {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            // Only fetch 3 for the home page recommendation widget
            try {
                const q = query(collection(db, "books"), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as BookItem[];
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return null; // Or skeleton
    if (books.length === 0) return null; // Hide section if no books

    return (
        <section className="py-16 md:py-24 bg-neutral-50 card-border-t">
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
                    {books.map((book) => (
                        <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-6 hover:shadow-md transition-shadow group">
                            <div className="h-24 w-16 bg-neutral-200 rounded shrink-0 overflow-hidden relative shadow-inner">
                                {book.coverUrl ? (
                                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600">
                                        <Book className="w-6 h-6 text-white opacity-50" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-dravida-red transition-colors mb-1 line-clamp-2">{book.title}</h3>
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
