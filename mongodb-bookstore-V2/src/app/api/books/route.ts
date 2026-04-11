import { NextResponse } from "next/server";
import connectMongoDB from "@/../mongo/mongodb";
import Book from "@/../mongo/models/Book";

export async function GET(request: Request) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim() || "";

        let filter = {};

        if (q) {
            const regex = new RegExp(q, "i");

            filter = {
                $or: [
                    { title: regex },
                    { sku: regex },
                    { format: regex },
                    { genre: regex },
                    { language: regex },
                    { "author.name": regex },
                    { "publisher.name": regex },
                ],
            };
        }

        const books = await Book.find(filter).sort({ createdAt: -1 }).lean();

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