"use client";

import { useEffect, useState, ChangeEvent } from "react";

type User = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  deliveryAddress?: string;
  memberSince?: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        userId: "",
        name: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
    });

    async function fetchUsers() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch("/api/users", {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch users.");
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setError("");

            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create user.");
            }

            setForm({
                userId: "",
                name: "",
                email: "",
                phoneNumber: "",
                deliveryAddress: "",
            });

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        }
    }

    async function handleDelete(userId: string) {
        try {
            setError("");

            const res = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete user.");
            }

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        }
    }

    return (
        <main style={{ padding: "2rem" }}>
            <h1>User Manager</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                <div>
                    <input
                        placeholder="User ID"
                        value={form.userId}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, userId: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <input
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <input
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                    />
                </div>

                <div>
                    <input
                        placeholder="Delivery Address"
                        value={form.deliveryAddress}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                deliveryAddress: e.target.value,
                            }))
                        }
                    />
                </div>

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Create User
                </button>
            </form>

            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}

            <div>
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            border: "1px solid gray",
                            padding: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <p><strong>User ID:</strong> {user.userId}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
                        <p><strong>Address:</strong> {user.deliveryAddress || "N/A"}</p>

                        <button onClick={() => handleDelete(user.userId)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
