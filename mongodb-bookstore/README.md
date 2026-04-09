# MongoDB Bookstore


## Disclosure

AI was used in order to give ideas on how to approach this project for example file structure and what the document model schemas should look like, and the HTML for the Admin Page, but this is otherwise all my work. Here are the following snippets.

```text
List the project file structure for a mongodb-bookstore project for an entry level application utilizing NextJS and with API endpoints.

> Suggested Next.js structure
nextjs-mongodb-bookstore/
├── app/
│   ├── page.tsx
│   ├── books/
│   │   ├── page.tsx
│   │   └── [sku]/
│   │       └── page.tsx
│   ├── authors/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── books/
│   │   │   └── page.tsx
│   │   └── reviews/
│   │       └── page.tsx
│   └── api/
│       ├── books/
│       │   ├── route.ts
│       │   └── [sku]/
│       │       └── route.ts
│       ├── reviews/
│       │   └── route.ts
│       └── authors/
│           └── [id]/
│               └── route.ts
├── components/
│   ├── BookCard.tsx
│   ├── ReviewList.tsx
│   ├── ReviewForm.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── mongodb.ts
│   └── queries.ts
├── models/
│   ├── Book.ts
│   ├── Review.ts
│   └── User.ts
├── scripts/
│   └── seed.ts
├── public/
├── .env.local
└── README.md
```

```text
Generate a schema list in an array format for me to implement. DO NOT create a mongodb schema for me. Only create the Book schema array list with the fields to include. REMEMBER this is a learning project and would not serve purpose to receieve any additional information that could spoil the project.

> ["sku", "title", "format", "author", "publisher", "genre", "language", "price", "summary", "average_rating", "release_date", "pages", "stock_level", "delivery_time_days", "duration_minutes", "narrators"]
```

```text
Can you generate just the html template for the admin/books/page? DO NOT give any implementation outside of this purpose as this is a learning opportunity. [Pasted Book Schema for context]


> return (
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
```
