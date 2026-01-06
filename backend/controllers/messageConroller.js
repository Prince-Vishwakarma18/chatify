import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import cloudinary from "../config/cloudinary.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

//Send message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { message } = req.body;
        // console.log(message)

        let imageUrl = "";

        if (req.file) {
            const base64 = `data:${
                req.file.mimetype
            };base64,${req.file.buffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(base64, {
                folder: "chat_images",
            });
            imageUrl = result.secure_url;
        }

        // Find or Create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        // Created new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
            image: imageUrl,
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        //Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive-message", newMessage);
        }

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.log("Error in Send controller", error);
        res.status(500).json({
            success: false,
            message: "Internal error in send controller",
        });
    }
};

//Get Messages
export const receiveMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");

        return res.status(200).json({
            success: true,
            messages: conversation?.messages || [],
        });
    } catch (error) {
        console.log("Error in receiveMessage:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
