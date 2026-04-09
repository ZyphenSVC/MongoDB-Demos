import BooksSearch from "@/components/BookSearch";

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

async function getBooks(): Promise<Book[]> {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000/api";

    const res = await fetch(`${baseUrl}/books`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch books.");
    }

    return res.json();
}

export default async function BooksPage() {
    const books = await getBooks();
    return <BooksSearch books={books} />;
}