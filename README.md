# MongoDB Demos

This repository is my personal workspace for learning MongoDB through actual projects. Preventing learning knowledge without having some form of an application to feel what I am learning with a more conceptual and practical understanding. Rather than keeping isolated demos in separate repositories, I am organizing my MongoDB work in one place and grouping each project into its own folder.

## Attribution
These notes are based on MongoDB University material, rewritten and extended with my own examples and design decisions.

## Purpose

This repository is meant to serve three as a record of my progress as I learn MongoDB concepts through actual implementation. I also wanted to keep a portfolio of small projects that demonstrate how I apply MongoDB in full-stack development environments such as Next.js and API development 

## Learning Goals

Across the projects in this repository, I am focusing on the following ideas:

- understanding the document model and how it differs from relational design
- modeling data around workload and access patterns
- deciding when to embed versus reference related data
- practicing CRUD operations with real application features
- using schema validation to enforce document structure
- working with arrays, subdocuments, and polymorphic document shapes
- building MongoDB-backed applications with Next.js and Endpoint APIs
- learning how to design collections for both read-heavy and write-heavy workloads
- exploring indexing and performance optimization
- developing repeatable local development workflows with MongoDB

### Important

Include a .env file

```text
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
MONGODB_URI=MyConnectionString  (with your password and database name inserted)	
```

## Running

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
