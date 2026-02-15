"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Book, Loader2, Link as LinkIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";

interface BookItem {
    id: string;
    title: string;
    author: string;
    description: string;
    coverUrl: string;
    buyLink: string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
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

    return (
        <main className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <PageHeader
                title="நூல்கள் & ஆவணங்கள் (Books)"
                description="திராவிட இயக்க நூல்கள் மற்றும் வரலாற்று ஆவணங்கள்"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Books", href: "/books" },
                ]}
            />

            <section className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                    </div>
                ) : books.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <Book className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No Books Found</h3>
                        <p className="text-neutral-500">Library is being updated.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                                <div className="h-48 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                                    {book.coverUrl ? (
                                        <img
                                            src={book.coverUrl}
                                            alt={book.title}
                                            className="h-full w-auto object-contain shadow-lg"
                                        />
                                    ) : (
                                        <Book className="w-16 h-16 text-neutral-300" />
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{book.title}</h3>
                                    <p className="text-sm font-semibold text-dravida-red mb-3">{book.author}</p>
                                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
                                        {book.description}
                                    </p>
                                    {book.buyLink && (
                                        <a
                                            href={book.buyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium text-sm"
                                        >
                                            Read / Buy <LinkIcon className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
