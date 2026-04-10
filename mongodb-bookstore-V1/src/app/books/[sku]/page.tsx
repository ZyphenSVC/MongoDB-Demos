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

async function getBook(sku: string): Promise<Book | null> {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000/api";

    const res = await fetch(`${baseUrl}/books/${sku}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function BookPage({params}: { params: Promise<{ sku: string }>; }) {
    const { sku } = await params;
    const book = await getBook(sku);

    if (!book) {
        return (
            <main style={{ padding: "2rem" }}>
                <h1>Book not found</h1>
            </main>
        );
    }

    return (
        <main style={{ padding: "2rem" }}>
            <h1>{book.title}</h1>

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
                <strong>Genre:</strong>{" "}
                {book.genre && book.genre.length > 0
                    ? book.genre.join(", ")
                    : "N/A"}
            </p>

            <p>
                <strong>Language:</strong> {book.language ?? "N/A"}
            </p>

            <p>
                <strong>Price:</strong>{" "}
                {book.price !== undefined ? `$${book.price}` : "N/A"}
            </p>

            <p>
                <strong>Average Rating:</strong> {book.average_rating ?? "N/A"}
            </p>

            <p>
                <strong>Summary:</strong> {book.summary ?? "N/A"}
            </p>

            <p>
                <strong>Release Date:</strong>{" "}
                {book.release_date
                    ? new Date(book.release_date).toLocaleDateString()
                    : "N/A"}
            </p>

            {book.pages !== undefined && (
                <p>
                    <strong>Pages:</strong> {book.pages}
                </p>
            )}

            {book.stock_level !== undefined && (
                <p>
                    <strong>Stock Level:</strong> {book.stock_level}
                </p>
            )}

            {book.delivery_time_days !== undefined && (
                <p>
                    <strong>Delivery Time:</strong> {book.delivery_time_days} days
                </p>
            )}

            {book.duration_minutes !== undefined && (
                <p>
                    <strong>Duration:</strong> {book.duration_minutes} minutes
                </p>
            )}

            {book.narrators && book.narrators.length > 0 && (
                <p>
                    <strong>Narrators:</strong> {book.narrators.join(", ")}
                </p>
            )}
        </main>
    );
}