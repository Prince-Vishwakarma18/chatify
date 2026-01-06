import mongoose from "mongoose";

export const messageModel = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        message: {
            type: String,
        },
        image: {
            type: String,
        },
    },

    { timestamps: true }
);

export default mongoose.model("Message", messageModel);
