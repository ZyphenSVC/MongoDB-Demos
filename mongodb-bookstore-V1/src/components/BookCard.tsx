import Link from "next/link";

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

export default function BookCard({ book }: { book: Book }) {
    return (
        <div
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
        <Link href={`/authors/${a.author_id}`}>{a.name}</Link>
        {index < book.author.length - 1 ? ", " : ""}
        </span>
    ))}
    </p>

    <p>
    <strong>Publisher:</strong> {book.publisher?.name ?? "N/A"}
    </p>

    <p>
    <strong>Price:</strong>{" "}
    {book.price !== undefined ? `$${book.price.toFixed(2)}` : "N/A"}
    </p>

    <p>
    <strong>Average Rating:</strong> {book.average_rating ?? "N/A"}
    </p>

    {book.genre && book.genre.length > 0 && (
        <p>
            <strong>Genre:</strong> {book.genre.join(", ")}
    </p>
    )}

    {book.summary && (
        <p>
            <strong>Summary:</strong> {book.summary}
    </p>
    )}
    </div>
);
}