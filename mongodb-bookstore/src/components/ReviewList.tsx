type Review = {
    _id?: string;
    review?: string;
    rating?: number;
    user_id?: string;
    timestamp?: string;
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <div>
            {reviews.map((review, index) => (
                    <div
                        key={review._id ?? index}
                style={{
        border: "1px solid gray",
            padding: "1rem",
            marginBottom: "1rem",
    }}
>
    <p><strong>User:</strong> {review.user_id ?? "Unknown"}</p>
    <p><strong>Rating:</strong> {review.rating ?? "N/A"}</p>
    <p><strong>Review:</strong> {review.review ?? ""}</p>
    </div>
))}
    </div>
);
}