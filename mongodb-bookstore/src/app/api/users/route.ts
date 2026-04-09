import { NextResponse } from "next/server";
import {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserByUserId,
} from "@/../mongo/queries";

export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch users." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { userId, name, email, phoneNumber, deliveryAddress } = body;

        if (!userId || !name || !email) {
            return NextResponse.json(
                { error: "userId, name, and email are required." },
                { status: 400 }
            );
        }

        const existingUserId = await getUserByUserId(userId);
        if (existingUserId) {
            return NextResponse.json(
                { error: "A user with this userId already exists." },
                { status: 409 }
            );
        }

        const existingEmail = await getUserByEmail(email);
        if (existingEmail) {
            return NextResponse.json(
                { error: "A user with this email already exists." },
                { status: 409 }
            );
        }

        const user = await createUser({
            userId,
            name,
            email,
            phoneNumber,
            deliveryAddress,
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create user." },
            { status: 500 }
        );
    }
}