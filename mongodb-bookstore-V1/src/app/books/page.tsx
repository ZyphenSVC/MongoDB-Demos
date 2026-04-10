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

async function getBooks(query: string): Promise<Book[]> {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000/api";

    const url = query
        ? `${baseUrl}/books?q=${encodeURIComponent(query)}`
        : `${baseUrl}/books`;

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch books.");
    }

    return res.json();
}

export default async function BooksPage({
                                            searchParams,
                                        }: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q?.trim() || "";

    const books = await getBooks(query);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Books</h1>

            <SearchBar defaultValue={query} />

            {query && (
                <p>
                    Search results for: <strong>{query}</strong>
                </p>
            )}

            <p>
                Showing {books.length} book{books.length === 1 ? "" : "s"}
            </p>

            {books.length === 0 ? (
                <p>No books matched your search.</p>
            ) : (
                <div>
                    {books.map((book) => (
                        <BookCard key={book.sku} book={book} />
                    ))}
                </div>
            )}
        </main>
    );
}