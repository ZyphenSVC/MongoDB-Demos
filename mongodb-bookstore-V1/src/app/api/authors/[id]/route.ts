import { NextResponse } from "next/server";
import connectMongoDB from "@/../mongo/mongodb";
import Book from "@/../mongo/models/Book";

type Context = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    try {
        const { id } = await context.params;

        await connectMongoDB();

        const books = await Book.find(
            { "author.author_id": id },
            {
                sku: 1,
                title: 1,
                format: 1,
                price: 1,
                average_rating: 1,
                author: 1,
            }
        ).lean();

        if (!books || books.length === 0) {
            return NextResponse.json(
                { error: "Author not found." },
                { status: 404 }
            );
        }

        const matchedAuthor = books[0].author.find(
            (a: { author_id: string; name: string }) => a.author_id === id
        );

        if (!matchedAuthor) {
            return NextResponse.json(
                { error: "Author not found." },
                { status: 404 }
            );
        }

        const authorBooks = books.map((book: any) => ({
            sku: book.sku,
            title: book.title,
            format: book.format,
            price: book.price,
            average_rating: book.average_rating,
        }));

        return NextResponse.json(
            {
                author: matchedAuthor,
                books: authorBooks,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch author.",
            },
            { status: 500 }
        );
    }
}