// app/api/books/[sku]/route.ts
import { NextResponse } from "next/server";
import connectMongoDB from "@/../mongo/mongodb";
import Book from "@/../mongo/models/Book";

type Context = {
    params: Promise<{
        sku: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    try {
        const { sku } = await context.params;

        await connectMongoDB();

        const book = await Book.findOne({ sku }).lean();

        if (!book) {
            return NextResponse.json({ error: "Book not found." }, { status: 404 });
        }

        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to fetch book.",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request, context: Context) {
    try {
        const { sku } = await context.params;
        const body = await request.json();

        await connectMongoDB();

        const updatedBook = await Book.findOneAndUpdate(
            { sku },
            { $set: body },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedBook) {
            return NextResponse.json({ error: "Book not found." }, { status: 404 });
        }

        return NextResponse.json(updatedBook, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to update book.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: Request, context: Context) {
    try {
        const { sku } = await context.params;

        await connectMongoDB();

        const deletedBook = await Book.findOneAndDelete({ sku }).lean();

        if (!deletedBook) {
            return NextResponse.json({ error: "Book not found." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Book deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to delete book.",
            },
            { status: 500 }
        );
    }
}