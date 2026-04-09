import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
    {
        review_id: {
            type: String,
            required: true,
            unique: true
        },
        book_sku: {
            type: String,
            required: true,
            index: true
        },
        user_id: {
            type: String,
            required: true,
            index: true
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        },
        review: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0, max: 5
        },
        comments: {
            type: [Schema.Types.Mixed],
            validate: {
                validator: (arr: any[]) => arr.length <= 3,
                message: "comments array cannot exceed 3 items",
            },
            default: [],
        },
    },
    {
        timestamps: true
    }
);

export default models.Review || model("Review", ReviewSchema);