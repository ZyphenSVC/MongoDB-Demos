type AuthorData = {
    author: {
        author_id: string;
        name: string;
    };
    books: {
        sku: string;
        title: string;
        format?: string;
        price?: number;
        average_rating?: number;
    }[];
};

async function getAuthorData(id: string): Promise<AuthorData | null> {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000/api";

    const res = await fetch(`${baseUrl}/authors/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function AuthorPage({params}: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const data = await getAuthorData(id);

    if (!data) {
        return (
            <main style={{ padding: "2rem" }}>
                <h1>Author not found</h1>
            </main>
        );
    }

    return (
        <main style={{ padding: "2rem" }}>
            <h1>{data.author.name}</h1>
            <p>
                <strong>Author ID:</strong> {data.author.author_id}
            </p>

            <h2 style={{ marginTop: "2rem" }}>Books</h2>

            {data.books.length === 0 ? (
                <p>No books found for this author.</p>
            ) : (
                <div>
                    {data.books.map((book) => (
                        <div
                            key={book.sku}
                            style={{
                                border: "1px solid gray",
                                padding: "1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <p>
                                <strong>Title:</strong> {book.title}
                            </p>
                            <p>
                                <strong>SKU:</strong> {book.sku}
                            </p>
                            <p>
                                <strong>Format:</strong> {book.format ?? "N/A"}
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