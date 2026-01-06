import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
   try {
      const token = req.cookies.jwt;
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized. No token provided.",
         });
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
         return res.status(401).json({
            success: false,
            message: "User not found ",
         });
      }
      // Attach user to request
      req.user = user;
      next();
   } catch (error) {
      console.log("Error in protectRoute middleware", error);
      res.status(500).json({
         success: false,
         message: "Internal server error in protect route",
      });
   }
};
