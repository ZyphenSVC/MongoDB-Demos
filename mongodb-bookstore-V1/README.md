# MongoDB Bookstore

This project MongoDB University coursework.

## What I Focused On
- Workload-driven schema design
- Embedding vs referencing tradeoffs
- Handling high-cardinality relationships
- Schema validation for production systems

## Applied Example
I implemented a bookstore data model where:
- Authors are embedded inside books (read optimization)
- Reviews are stored separately and referenced (write scalability)

## Key Insight
MongoDB schema design is not about normalization — it is about **access patterns and workload efficiency**.

## Attribution
These notes are based on MongoDB University material, rewritten and extended with my own examples and design decisions.

## MongoSH

```terminaloutput
mongosh "mongodb://127.0.0.1:27017/bookstore"

bookstore> show collections
users

bookstore> db.users.findOne()
{
  _id: ObjectId('69d76d69ce8c82923a5b6db8'),
  userId: 'sdbfdshfb',
  name: 'fhjdsbfjh',
  email: 's@gmail.com',
  phoneNumber: '29483843298',
  deliveryAddress: 'fuashfuijoqi douad',
  memberSince: ISODate('2026-04-09T09:12:09.564Z'),
  createdAt: ISODate('2026-04-09T09:12:09.570Z'),
  updatedAt: ISODate('2026-04-09T09:12:09.570Z')
}
bookstore> 

AFTER DELETE

bookstore> db.users.findOne()
null

bookstore> db.books.find().pretty()
[
  {
    _id: ObjectId('69d776fbc5dc241d5f416424'),
    sku: 'BK-1001',
    title: 'The Stars Beyond Orion',
    format: 'printed',
    author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ],
    publisher: { publisher_id: 'PUB-001', name: 'Nova House' },
    genre: [ 'Science Fiction', 'Adventure' ],
    language: 'English',
    price: 24.99,
    summary: 'A deep-space expedition uncovers a signal from beyond known space.',
    average_rating: 4.6,
    release_date: ISODate('2023-09-15T00:00:00.000Z'),
    pages: 412,
    stock_level: 38,
    delivery_time_days: 3,
    narrators: [],
    __v: 0,
    createdAt: ISODate('2026-04-09T09:52:59.765Z'),
    updatedAt: ISODate('2026-04-09T09:52:59.765Z')
  },
  {
    _id: ObjectId('69d776fbc5dc241d5f416425'),
    sku: 'BK-1002',
    title: 'The Last Ember Crown',
    ...
  },
  {
    _id: ObjectId('69d776fbc5dc241d5f416426'),
    sku: 'BK-1003',
    title: 'Quiet Systems',
    ...
  },
  {
    _id: ObjectId('69d776fbc5dc241d5f416427'),
    sku: 'BK-1004',
    title: 'Patterns of Proof',
    ...
  },
  {
    _id: ObjectId('69d776fbc5dc241d5f416428'),
    sku: 'BK-1005',
    title: 'The Atlas of Rain',
    format: 'printed',
    author: [
      { author_id: 'AUTH-005', name: 'Isla Moreno' },
      { author_id: 'AUTH-006', name: 'Jon Mercer' }
    ],
    publisher: { publisher_id: 'PUB-005', name: 'Blue Current Books' },
    genre: [ 'Literary Fiction', 'Drama' ],
    language: 'English',
    price: 21.75,
    summary: 'Two strangers trace a vanished cartographer through cities shaped by weather.',
    average_rating: 4.4,
    release_date: ISODate('2020-11-03T00:00:00.000Z'),
    pages: 328,
    stock_level: 22,
    delivery_time_days: 4,
    narrators: [],
    __v: 0,
    createdAt: ISODate('2026-04-09T09:52:59.766Z'),
    updatedAt: ISODate('2026-04-09T09:52:59.766Z')
  },
  {
    _id: ObjectId('69d776fbc5dc241d5f416429'),
    sku: 'BK-1006',
    title: 'Listening to Saturn',
    ...
  }
]

bookstore> db.books.find(
|   {},
|   { _id: 0, sku: 1, title: 1, format: 1, author: 1, publisher: 1, price: 1 }
| ).pretty()
[
  {
    sku: 'BK-1001',
    title: 'The Stars Beyond Orion',
    format: 'printed',
    author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ],
    publisher: { publisher_id: 'PUB-001', name: 'Nova House' },
    price: 24.99
  },
  {
    sku: 'BK-1002',
    title: 'The Last Ember Crown',
    format: 'ebook',
    author: [ { author_id: 'AUTH-002', name: 'Marcus Vale' } ],
    publisher: { publisher_id: 'PUB-002', name: 'Ashgrove Press' },
    price: 12.99
  },
  {
    sku: 'BK-1003',
    title: 'Quiet Systems',
    format: 'audiobook',
    author: [ { author_id: 'AUTH-003', name: 'Naomi Pierce' } ],
    publisher: { publisher_id: 'PUB-003', name: 'Signal Ridge' },
    price: 18.5
  },
  {
    sku: 'BK-1004',
    title: 'Patterns of Proof',
    format: 'printed',
    author: [ { author_id: 'AUTH-004', name: 'Daniel Rowan' } ],
    publisher: { publisher_id: 'PUB-004', name: 'Summit Academic' },
    price: 31
  },
  {
    sku: 'BK-1005',
    title: 'The Atlas of Rain',
    format: 'printed',
    author: [
      { author_id: 'AUTH-005', name: 'Isla Moreno' },
      { author_id: 'AUTH-006', name: 'Jon Mercer' }
    ],
    publisher: { publisher_id: 'PUB-005', name: 'Blue Current Books' },
    price: 21.75
  },
  {
    sku: 'BK-1006',
    title: 'Listening to Saturn',
    format: 'audiobook',
    author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ],
    publisher: { publisher_id: 'PUB-001', name: 'Nova House' },
    price: 16.99
  }
]

bookstore> db.books.findOne({ sku: "BK-1001" })
{
  _id: ObjectId('69d776fbc5dc241d5f416424'),
  sku: 'BK-1001',
  title: 'The Stars Beyond Orion',
  format: 'printed',
  author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ],
  publisher: { publisher_id: 'PUB-001', name: 'Nova House' },
  genre: [ 'Science Fiction', 'Adventure' ],
  language: 'English',
  price: 24.99,
  summary: 'A deep-space expedition uncovers a signal from beyond known space.',
  average_rating: 4.6,
  release_date: ISODate('2023-09-15T00:00:00.000Z'),
  pages: 412,
  stock_level: 38,
  delivery_time_days: 3,
  narrators: [],
  __v: 0,
  createdAt: ISODate('2026-04-09T09:52:59.765Z'),
  updatedAt: ISODate('2026-04-09T09:52:59.765Z')
}

bookstore> db.books.find(
|   {},
|   { _id: 0, title: 1, author: 1 }
| ).pretty()
[
  {
    title: 'The Stars Beyond Orion',
    author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ]
  },
  {
    title: 'The Last Ember Crown',
    author: [ { author_id: 'AUTH-002', name: 'Marcus Vale' } ]
  },
  {
    title: 'Quiet Systems',
    author: [ { author_id: 'AUTH-003', name: 'Naomi Pierce' } ]
  },
  {
    title: 'Patterns of Proof',
    author: [ { author_id: 'AUTH-004', name: 'Daniel Rowan' } ]
  },
  {
    title: 'The Atlas of Rain',
    author: [
      { author_id: 'AUTH-005', name: 'Isla Moreno' },
      { author_id: 'AUTH-006', name: 'Jon Mercer' }
    ]
  },
  {
    title: 'Listening to Saturn',
    author: [ { author_id: 'AUTH-001', name: 'Elena Hart' } ]
  }
]

bookstore> db.books.find({ title: /orion/i }, { _id: 0, sku: 1, title: 1 }).pretty()
[ { sku: 'BK-1001', title: 'The Stars Beyond Orion' } ]

db.books.find(
  { "author.name": /elena/i },
  { _id: 0, title: 1, author: 1 }
).pretty()

db.books.updateOne(
  { sku: "BK-1001" },
  { $set: { price: 29.99 } }
)
```

## Disclosure

AI was used in order to give ideas on how to approach this project for example file structure and what the document model schemas should look like, the HTML for the Admin Page, and fake data, but this is otherwise all my work. Here are the following snippets.

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
│   └── api/
│       ├── books/
│       │   ├── route.ts
│       │   └── [sku]/
│       │       └── route.ts
│       └── authors/
│           └── [id]/
│               └── route.ts
├── components/
│   ├── BookCard.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── mongodb.ts
│   └── queries.ts
├── models/
│   ├── Book.ts
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


```text
Can you generate fake book data?

> import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book";

dotenv.config({ path: ".env.local" });

async function seedBooks() {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI is not defined in .env.local");
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        await Book.deleteMany({});
        console.log("Cleared existing books.");

        await Book.insertMany([
            {
                sku: "BK-1001",
                title: "The Stars Beyond Orion",
                format: "printed",
                author: [
                    {
                        author_id: "AUTH-001",
                        name: "Elena Hart",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-001",
                    name: "Nova House",
                },
                genre: ["Science Fiction", "Adventure"],
                language: "English",
                price: 24.99,
                summary: "A deep-space expedition uncovers a signal from beyond known space.",
                average_rating: 4.6,
                release_date: new Date("2023-09-15"),
                pages: 412,
                stock_level: 38,
                delivery_time_days: 3,
            },
            {
                sku: "BK-1002",
                title: "The Last Ember Crown",
                format: "ebook",
                author: [
                    {
                        author_id: "AUTH-002",
                        name: "Marcus Vale",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-002",
                    name: "Ashgrove Press",
                },
                genre: ["Fantasy"],
                language: "English",
                price: 12.99,
                summary: "A fallen kingdom’s last heir searches for an ancient crown of fire.",
                average_rating: 4.3,
                release_date: new Date("2022-05-10"),
                pages: 356,
            },
            {
                sku: "BK-1003",
                title: "Quiet Systems",
                format: "audiobook",
                author: [
                    {
                        author_id: "AUTH-003",
                        name: "Naomi Pierce",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-003",
                    name: "Signal Ridge",
                },
                genre: ["Thriller", "Tech"],
                language: "English",
                price: 18.5,
                summary: "A cybersecurity analyst discovers a silent breach inside a major network.",
                average_rating: 4.1,
                release_date: new Date("2024-01-18"),
                duration_minutes: 610,
                narrators: ["Sophie Lane"],
            },
            {
                sku: "BK-1004",
                title: "Patterns of Proof",
                format: "printed",
                author: [
                    {
                        author_id: "AUTH-004",
                        name: "Daniel Rowan",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-004",
                    name: "Summit Academic",
                },
                genre: ["Mathematics", "Nonfiction"],
                language: "English",
                price: 31.0,
                summary: "An accessible tour through proof, abstraction, and mathematical thought.",
                average_rating: 4.8,
                release_date: new Date("2021-08-01"),
                pages: 290,
                stock_level: 14,
                delivery_time_days: 5,
            },
            {
                sku: "BK-1005",
                title: "The Atlas of Rain",
                format: "printed",
                author: [
                    {
                        author_id: "AUTH-005",
                        name: "Isla Moreno",
                    },
                    {
                        author_id: "AUTH-006",
                        name: "Jon Mercer",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-005",
                    name: "Blue Current Books",
                },
                genre: ["Literary Fiction", "Drama"],
                language: "English",
                price: 21.75,
                summary: "Two strangers trace a vanished cartographer through cities shaped by weather.",
                average_rating: 4.4,
                release_date: new Date("2020-11-03"),
                pages: 328,
                stock_level: 22,
                delivery_time_days: 4,
            },
            {
                sku: "BK-1006",
                title: "Listening to Saturn",
                format: "audiobook",
                author: [
                    {
                        author_id: "AUTH-001",
                        name: "Elena Hart",
                    },
                ],
                publisher: {
                    publisher_id: "PUB-001",
                    name: "Nova House",
                },
                genre: ["Science Fiction"],
                language: "English",
                price: 16.99,
                summary: "A linguist aboard a research station tries to decode a signal from Saturn’s rings.",
                average_rating: 4.5,
                release_date: new Date("2024-06-22"),
                duration_minutes: 540,
                narrators: ["Avery Cole"],
            },
        ]);

        console.log("Seeded books successfully.");
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seedBooks();
```