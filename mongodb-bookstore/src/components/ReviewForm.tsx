"use client";

import { FormEvent, useState } from "react";

export default function ReviewForm() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("5");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("Review submission disabled for now:", { review, rating });
        setReview("");
        setRating("5");
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
    <div>
        <textarea
            placeholder="Write a review..."
    value={review}
    onChange={(e) => setReview(e.target.value)}
    />
    </div>

    <div>
    <select
        value={rating}
    onChange={(e) => setRating(e.target.value)}
>
    <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        </div>

        <button type="submit">Submit Review</button>
    </form>
);
}