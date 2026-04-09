# MongoDB Bookstore

## Disclosure

AI was used in order to give ideas on how to approach this project for example file structure and what the document model schemas should look like, but this is otherwise all my work. Here are the following snippets.

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
