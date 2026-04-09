import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./mongo/models/Book";

dotenv.config({ path: ".env" });

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