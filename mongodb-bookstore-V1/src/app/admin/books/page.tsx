"use client";

import { ChangeEvent, useEffect, useState } from "react";

type AuthorSummary = {
    author_id: string;
    name: string;
};

type Publisher = {
    publisher_id: string;
    name: string;
};

type Book = {
    _id?: string;
    sku: string;
    title: string;
    format: "printed" | "ebook" | "audiobook";
    author: AuthorSummary[];
    publisher: Publisher;
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

const emptyForm = {
    sku: "",
    title: "",
    format: "printed",
    author_id: "",
    author_name: "",
    publisher_id: "",
    publisher_name: "",
    genre: "",
    language: "",
    price: "",
    summary: "",
    pages: "",
    stock_level: "",
    delivery_time_days: "",
    duration_minutes: "",
    narrators: "",
};

export default function AdminBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingSku, setEditingSku] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function fetchBooks() {
        const res = await fetch("/api/books", { cache: "no-store" });
        const data = await res.json();
        if (res.ok) {
            setBooks(data);
        } else {
            setError(data.error || "Failed to fetch books.");
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    function resetForm() {
        setForm(emptyForm);
        setEditingSku(null);
    }

    function loadBookIntoForm(book: Book) {
        setEditingSku(book.sku);
        setForm({
            sku: book.sku,
            title: book.title,
            format: book.format,
            author_id: book.author[0]?.author_id || "",
            author_name: book.author[0]?.name || "",
            publisher_id: book.publisher?.publisher_id || "",
            publisher_name: book.publisher?.name || "",
            genre: book.genre?.join(", ") || "",
            language: book.language || "",
            price: book.price?.toString() || "",
            summary: book.summary || "",
            pages: book.pages?.toString() || "",
            stock_level: book.stock_level?.toString() || "",
            delivery_time_days: book.delivery_time_days?.toString() || "",
            duration_minutes: book.duration_minutes?.toString() || "",
            narrators: book.narrators?.join(", ") || "",
        });
    }

    async function handleCreate(e: ChangeEvent) {
        e.preventDefault();
        setError("");
        setMessage("");

        const payload = {
            sku: form.sku,
            title: form.title,
            format: form.format,
            author: [
                {
                    author_id: form.author_id,
                    name: form.author_name,
                },
            ],
            publisher: {
                publisher_id: form.publisher_id,
                name: form.publisher_name,
            },
            genre: form.genre ? form.genre.split(",").map((g) => g.trim()) : [],
            language: form.language || undefined,
            price: form.price ? Number(form.price) : undefined,
            summary: form.summary || undefined,
            pages: form.pages ? Number(form.pages) : undefined,
            stock_level: form.stock_level ? Number(form.stock_level) : undefined,
            delivery_time_days: form.delivery_time_days
                ? Number(form.delivery_time_days)
                : undefined,
            duration_minutes: form.duration_minutes
                ? Number(form.duration_minutes)
                : undefined,
            narrators: form.narrators
                ? form.narrators.split(",").map((n) => n.trim())
                : [],
        };

        const res = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to create book.");
            return;
        }

        setMessage("Book created.");
        resetForm();
        fetchBooks();
    }

    async function handleUpdate(e: ChangeEvent) {
        e.preventDefault();
        if (!editingSku) return;

        setError("");
        setMessage("");

        const payload = {
            title: form.title,
            format: form.format,
            author: [
                {
                    author_id: form.author_id,
                    name: form.author_name,
                },
            ],
            publisher: {
                publisher_id: form.publisher_id,
                name: form.publisher_name,
            },
            genre: form.genre ? form.genre.split(",").map((g) => g.trim()) : [],
            language: form.language || undefined,
            price: form.price ? Number(form.price) : undefined,
            summary: form.summary || undefined,
            pages: form.pages ? Number(form.pages) : undefined,
            stock_level: form.stock_level ? Number(form.stock_level) : undefined,
            delivery_time_days: form.delivery_time_days
                ? Number(form.delivery_time_days)
                : undefined,
            duration_minutes: form.duration_minutes
                ? Number(form.duration_minutes)
                : undefined,
            narrators: form.narrators
                ? form.narrators.split(",").map((n) => n.trim())
                : [],
        };

        const res = await fetch(`/api/books/${editingSku}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to update book.");
            return;
        }

        setMessage("Book updated.");
        resetForm();
        fetchBooks();
    }

    async function handleDelete(sku: string) {
        setError("");
        setMessage("");

        const res = await fetch(`/api/books/${sku}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to delete book.");
            return;
        }

        setMessage("Book deleted.");
        fetchBooks();
    }

    return (
        <main style={{ padding: "2rem" }}>
    <h1>Admin Books</h1>

    {error && <p>{error}</p>}
        {message && <p>{message}</p>}

        <form onSubmit={editingSku ? handleUpdate : handleCreate}>
        <input
            placeholder="SKU"
            value={form.sku}
            disabled={!!editingSku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
            <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value as "printed" | "ebook" | "audiobook" })}
        >
            <option value="printed">printed</option>
                <option value="ebook">ebook</option>
            <option value="audiobook">audiobook</option>
            </select>
            <input
            placeholder="Author ID"
            value={form.author_id}
            onChange={(e) => setForm({ ...form, author_id: e.target.value })}
            />
            <input
            placeholder="Author Name"
            value={form.author_name}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            />
            <input
            placeholder="Publisher ID"
            value={form.publisher_id}
            onChange={(e) => setForm({ ...form, publisher_id: e.target.value })}
            />
            <input
            placeholder="Publisher Name"
            value={form.publisher_name}
            onChange={(e) => setForm({ ...form, publisher_name: e.target.value })}
            />
            <input
            placeholder="Genre comma separated"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            />
            <input
            placeholder="Language"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            />
            <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
            placeholder="Pages"
            value={form.pages}
            onChange={(e) => setForm({ ...form, pages: e.target.value })}
            />
            <input
            placeholder="Stock Level"
            value={form.stock_level}
            onChange={(e) => setForm({ ...form, stock_level: e.target.value })}
            />
            <input
            placeholder="Delivery Time Days"
            value={form.delivery_time_days}
            onChange={(e) => setForm({ ...form, delivery_time_days: e.target.value })}
            />
            <input
            placeholder="Duration Minutes"
            value={form.duration_minutes}
            onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
            />
            <input
            placeholder="Narrators comma separated"
            value={form.narrators}
            onChange={(e) => setForm({ ...form, narrators: e.target.value })}
            />
            <textarea
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />

            <div style={{ marginTop: "1rem" }}>
            <button type="submit">
                {editingSku ? "Update Book" : "Create Book"}
                </button>
            {editingSku && (
                <button type="button" onClick={resetForm} style={{ marginLeft: "1rem" }}>
                Cancel Edit
            </button>
            )}
            </div>
            </form>

            <hr style={{ margin: "2rem 0" }} />

        <h2>Existing Books</h2>

            {books.map((book) => (
                <div
                    key={book.sku}
                style={{
                border: "1px solid gray",
                    padding: "1rem",
                    marginBottom: "1rem",
            }}
            >
                <p><strong>{book.title}</strong></p>
            <p>SKU: {book.sku}</p>
            <p>Format: {book.format}</p>
            <p>Author(s): {book.author.map((a) => a.name).join(", ")}</p>

            <button onClick={() => loadBookIntoForm(book)}>Edit</button>
            <button onClick={() => handleDelete(book.sku)} style={{ marginLeft: "1rem" }}>
                Delete
                </button>
                </div>
            ))}
            </main>
        );
}