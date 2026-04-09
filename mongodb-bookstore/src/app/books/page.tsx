import Link from "next/link";

type Book = {
    _id?: string;
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

    return (
        <main style={{ padding: "2rem" }}>
    <h1>Books</h1>

    {books.length === 0 ? (
        <p>No books found.</p>
    ) : (
        <div>
            {books.map((book) => (
                    <div
                        key={book.sku}
                style={{
        border: "1px solid gray",
            padding: "1rem",
            marginBottom: "1rem",
    }}
    >
        <h2>
            <Link href={`/books/${book.sku}`}>{book.title}</Link>
    </h2>

    <p>
    <strong>SKU:</strong> {book.sku}
    </p>

    <p>
    <strong>Format:</strong> {book.format}
    </p>

    <p>
    <strong>Authors:</strong>{" "}
        {book.author.map((a, index) => (
            <span key={a.author_id}>
            <Link href={`/authors/${a.author_id}`}>
            {a.name}
            </Link>
            {index < book.author.length - 1 ? ", " : ""}
            </span>
        ))}
        </p>

        <p>
        <strong>Publisher:</strong>{" "}
        {book.publisher?.name ?? "N/A"}
        </p>

        <p>
        <strong>Price:</strong>{" "}
        {book.price !== undefined ? `$${book.price}` : "N/A"}
        </p>

        <p>
        <strong>Average Rating:</strong>{" "}
        {book.average_rating ?? "N/A"}
        </p>
        </div>
    ))}
        </div>
    )}
    </main>
);
}