type SearchBarProps = {
    defaultValue?: string,
    value?: string,
    onChange?: void
};

export default function SearchBar({defaultValue = ""}: SearchBarProps) {
    return (
        <form action="/books" method="GET" style={{marginBottom: "1rem"}}>
            <input
                type="text"
                name="q"
                defaultValue={defaultValue}
                placeholder="Search books by title, author, genre, SKU..."
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: "0.75rem",
                    border: "1px solid gray",
                }}
            />
            <div style={{marginTop: "0.75rem"}}>
                <button type="submit">Search</button>
            </div>
        </form>
    );
}