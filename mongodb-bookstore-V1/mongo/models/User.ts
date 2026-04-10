import { Schema, models, model, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: null,
        },
        deliveryAddress: {
            type: String,
            trim: true,
            default: null,
        },
        memberSince: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export default models.User || model("User", UserSchema);