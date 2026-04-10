import { NextResponse } from "next/server";
import {
    deleteUserByUserId,
    getUserByUserId,
    updateUserByUserId,
} from "@/../mongo/queries";

type Context = {
    params: Promise<{
        userId: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    try {
        const { userId } = await context.params;
        const user = await getUserByUserId(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch user." },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request, context: Context) {
    try {
        const { userId } = await context.params;
        const body = await request.json();

        const updated = await updateUserByUserId(userId, body);

        if (!updated) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update user." },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: Request, context: Context) {
    try {
        const { userId } = await context.params;
        const deleted = await deleteUserByUserId(userId);

        if (!deleted) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "User deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete user." },
            { status: 500 }
        );
    }
}