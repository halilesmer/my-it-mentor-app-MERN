import {
  signUp,
  uploadUserPicture,
  getProfile,
  menteesSignIn,
} from "../controllers/menteesController.js";

import express from "express";
import { jwtAuth } from "../util/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageupload", multerUploads.single("image"), uploadUserPicture);


router.post("/signup", signUp);
router.post("/signin", menteesSignIn);

 router.get("/menteeprofile", jwtAuth, getProfile);
// router.post("/editmentee", jwtAuth, editMentor);

export default router;