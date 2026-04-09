import BookCard from "@/components/BookCard";

type Book = {
    sku: string;
    title: string;
    format: "printed" | "ebook" | "audiobook";
    author: {
        author_id: string;
        name: string;
    }[];
    publisher?: {
        publisher_id: string;
        name: string;
    };
    genre?: string[];
    language?: string;
    price?: number;
    summary?: string;
    average_rating?: number;
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

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Books</h1>

            {books.length === 0 ? (
                <p>No books found.</p>
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