"use client";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function SearchBar({
                                      value,
                                      onChange,
                                      placeholder = "Search books...",
                                  }: SearchBarProps) {
    return (
        <div style={{ marginBottom: "1rem" }}>
    <input
        type="text"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    style={{
        width: "100%",
            maxWidth: "400px",
            padding: "0.5rem",
    }}
    />
    </div>
);
}