// app/api/books/route.ts
import { NextResponse } from "next/server";
import connectMongoDB from "@/../mongo/mongodb";
import Book from "@/../mongo/models/Book";

export async function GET() {
    try {
        await connectMongoDB();

        const books = await Book.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to fetch books.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectMongoDB();

        const body = await request.json();

        if (!body.sku || !body.title || !body.format || !body.author || !body.publisher) {
            return NextResponse.json(
                {
                    error: "sku, title, format, author, and publisher are required.",
                },
                { status: 400 }
            );
        }

        const existingBook = await Book.findOne({ sku: body.sku }).lean();

        if (existingBook) {
            return NextResponse.json(
                { error: "A book with this SKU already exists." },
                { status: 409 }
            );
        }

        const newBook = await Book.create(body);

        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to create book.",
            },
            { status: 500 }
        );
    }
}