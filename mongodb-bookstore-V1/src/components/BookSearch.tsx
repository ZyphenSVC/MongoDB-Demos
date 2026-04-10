"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";

type AuthorSummary = {
    author_id: string;
    name: string;
};

type Publisher = {
    publisher_id: string;
    name: string;
};

type Book = {
    sku: string;
    title: string;
    format: "printed" | "ebook" | "audiobook";
    author: AuthorSummary[];
    publisher?: Publisher;
    genre?: string[];
    language?: string;
    price?: number;
    summary?: string;
    average_rating?: number;
    release_date?: string;
    pages?: number;
    stock_level?: number;
    delivery_time_days?: number;
    duration_minutes?: number;
    narrators?: string[];
};

export default function BooksClient({ books }: { books: Book[] }) {
    const [query, setQuery] = useState("");

    const filteredBooks = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) {
            return books;
        }

        return books.filter((book) => {
            const inTitle = book.title.toLowerCase().includes(q);
            const inSku = book.sku.toLowerCase().includes(q);
            const inFormat = book.format.toLowerCase().includes(q);
            const inPublisher = book.publisher?.name?.toLowerCase().includes(q) ?? false;
            const inLanguage = book.language?.toLowerCase().includes(q) ?? false;
            const inGenres =
                book.genre?.some((genre) => genre.toLowerCase().includes(q)) ?? false;
            const inAuthors = book.author.some((a) =>
                a.name.toLowerCase().includes(q)
            );

            return (
                inTitle ||
                inSku ||
                inFormat ||
                inPublisher ||
                inLanguage ||
                inGenres ||
                inAuthors
            );
        });
    }, [books, query]);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Books</h1>

            <SearchBar defaultValue={query} onChange={setQuery(query)} />

            <p>
                Showing {filteredBooks.length} of {books.length} books
            </p>

            {filteredBooks.length === 0 ? (
                <p>No books matched your search.</p>
            ) : (
                <div>
                    {filteredBooks.map((book) => (
                        <BookCard key={book.sku} book={book} />
                    ))}
                </div>
            )}
        </main>
    );
}


