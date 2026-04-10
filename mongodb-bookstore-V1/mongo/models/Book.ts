import { Schema, model, models } from "mongoose";

const AuthorSummarySchema = new Schema(
    {
        author_id: {
            type: String, required: true
        },
        name: {
            type: String, required: true
        },
    },
    {
        _id: false
    }
);

const PublisherSchema = new Schema(
    {
        publisher_id: {
            type: String, required: true
        },
        name: {
            type: String, required: true
        },
    },
    {
        _id: false
    }
);

const BookSchema = new Schema(
    {
        sku: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        format: {
            type: String,
            enum: ["printed", "ebook", "audiobook"],
            required: true,
        },
        author: {
            type: [AuthorSummarySchema],
            required: true
        },
        publisher: {
            type: PublisherSchema,
            required: true
        },
        genre: [{ type: String }],
        language: String,
        price: Number,
        summary: String,
        average_rating: {
            type: Number,
            default: 0
        },
        release_date: Date,
        pages: Number,
        stock_level: Number,
        delivery_time_days: Number,
        duration_minutes: Number,
        narrators: [{ type: String }],
    },
    {
        timestamps: true
    }
);

export default models.Book || model("Book", BookSchema);