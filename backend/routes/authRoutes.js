import express from 'express'
import { signup , login , logout , updateProfile} from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { upload } from '../config/multer.js';
const router = express.Router();

router.post("/signup",upload.single("profilePic"),signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile
);

export default router;
