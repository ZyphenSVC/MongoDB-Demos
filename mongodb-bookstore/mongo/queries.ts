import connectMongoDB from "@/../mongo/mongodb";
import User from "@/../mongo/models/User";

export type CreateUserInput = {
    userId: string;
    name: string;
    email: string;
    phoneNumber?: string | null;
    deliveryAddress?: string | null;
    memberSince?: Date;
};

export type UpdateUserInput = Partial<Omit<CreateUserInput, "userId">>;

export async function getAllUsers() {
    await connectMongoDB();

    return User.find({})
        .sort({ createdAt: -1 })
        .lean();
}

export async function getUserByMongoId(id: string) {
    await connectMongoDB();

    return User.findById(id).lean();
}

export async function getUserByUserId(userId: string) {
    await connectMongoDB();

    return User.findOne({ userId }).lean();
}

export async function getUserByEmail(email: string) {
    await connectMongoDB();

    return User.findOne({ email: email.toLowerCase() }).lean();
}

export async function createUser(input: CreateUserInput) {
    await connectMongoDB();

    const user = await User.create({
        userId: input.userId,
        name: input.name,
        email: input.email.toLowerCase(),
        phoneNumber: input.phoneNumber ?? null,
        deliveryAddress: input.deliveryAddress ?? null,
        memberSince: input.memberSince ?? new Date(),
    });

    return user.toObject();
}

export async function updateUserByUserId(
    userId: string,
    updates: UpdateUserInput
) {
    await connectMongoDB();

    const payload = {
        ...updates,
        ...(updates.email ? { email: updates.email.toLowerCase() } : {}),
    };

    return User.findOneAndUpdate(
        { userId },
        { $set: payload },
        { returnDocument: 'after', runValidators: true }
    ).lean();
}

export async function deleteUserByUserId(userId: string) {
    await connectMongoDB();

    return User.findOneAndDelete({ userId }).lean();
}