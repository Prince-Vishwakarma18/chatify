import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

//Signup
export const signup = async (req, res) => {
   try {
      const { fullName, username, password, confirmPassword, gender } =
         req.body;
      if (!fullName || !username || !password || !confirmPassword || !gender) {
         return res.status(400).json({
            success: false,
            message: "All fields are required",
         });
      }
      if (password.length < 5) {
         return res.status(400).json({
            success: false,
            message: "Password must at least 5 characters",
         });
      }

      if (password !== confirmPassword) {
         return res.status(400).json({
            success: false,
            message: "Password is incorrect",
         });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).json({
            success: false,
            message: "Username already exists",
         });
      }

      //Hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      let profilePic = "";
      // Cloudinary Upload
      if (req.file) {
         const base64 = req.file.buffer.toString("base64");
         const fileUri = `data:${req.file.mimetype};base64,${base64}`;

         const uploadResponse = await cloudinary.uploader.upload(fileUri, {
            folder: "chatify_users",
         });

         profilePic = uploadResponse.secure_url;
      } else {
         profilePic =
            gender === "male"
               ? `https://avatar.iran.liara.run/public/boy?username=${username}`
               : `https://avatar.iran.liara.run/public/girl?username=${username}`;
      }

      const newUser = new User({
         fullName: fullName,
         username: username,
         password: hashedPassword,
         profilePic,
         gender,
      });

      // Generate JWT token here
      if (newUser) {
         await newUser.save();

         generateToken(newUser._id, res);

         res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
               _id: newUser._id,
               fullName: newUser.fullName,
               username: newUser.username,
               profilePic: newUser.profilePic,
               gender: newUser.gender,
            },
         });
      } else {
         res.status(400).json({
            success: false,
            message: "Invalid user data",
         });
      }
   } catch (error) {
      console.log("Error in signup controller", error);
      res.status(500).json({
         message: "Internal server error",
      });
   }
};

//Login
export const login = async (req, res) => {
   try {
      const { username, password } = req.body;
      // console.log("username:",username);

      const user = await User.findOne({ username });
      //if user not found
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User not found",
         });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user?.password);
      //If password is incorrect
      if (!isPasswordCorrect) {
         return res.status(400).json({
            success: false,
            message: "Incorrect password",
         });
      }

      generateToken(user._id, res);
      res.status(200).json({
         success: true,
         message: "logged in successfully",
         user: {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
         },
      });
   } catch (error) {
      console.log("Error in login controller", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
};
//Logout
export const logout = async (req, res) => {
   try {
      res.clearCookie("jwt", {
         httpOnly: true,
         sameSite: "strict",
         secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({
         success: true,
         message: "Logged out successfully",
      });
   } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
   }
};

//Update profilePic
export const updateProfile = async (req, res) => {
   try {
      const userId = req.user._id;

      if (!req.file) {
         return res.status(400).json({
            success: false,
            message: "Profile photo is required",
         });
      }

      // Base64 convert
      const base64 = req.file.buffer.toString("base64");
      const fileUri = `data:${req.file.mimetype};base64,${base64}`;

      // Cloudinary Upload
      const uploadResponse = await cloudinary.uploader.upload(fileUri, {
         folder: "chatify_users",
      });

      const updatedUser = await User.findByIdAndUpdate(
         userId,
         { profilePic: uploadResponse.secure_url },
         { new: true }
      ).select("-password");

      return res.status(200).json({
         success: true,
         message: "Profile updated successfully",
         user: updatedUser,
      });
   } catch (error) {
      console.log("error in update profile:", error);
      return res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};
