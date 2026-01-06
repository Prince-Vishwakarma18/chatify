import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { sendMessage, receiveMessage } from '../controllers/messageConroller.js';
import { getUserForSidebar } from '../controllers/otherUsersController.js';
import { upload } from '../config/multer.js';


const router = express.Router();

router.get("/users",protectRoute, getUserForSidebar)

router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);

router.get("/:id",protectRoute, receiveMessage);


export default router; 