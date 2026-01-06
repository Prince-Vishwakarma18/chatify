import User from "../models/userModel.js";

//Users for sidebar
export const getUserForSidebar = async (req, res) => {
   try {
      const loggedInUser = req.user._id;
      const otherUsers = await User.find({_id: { $ne: loggedInUser }, }).select("-password");
      return res.status(200).json({
         success: true,
         users: otherUsers,
      });
   } catch (error) {
      console.log("Error in otherUsers controller", error);
      return res.status(500).json({
         success: false,
         message: "Internal Server Error",
      });
   }
};
