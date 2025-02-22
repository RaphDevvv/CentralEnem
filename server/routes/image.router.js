import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import uploadImagesController from "../controllers/imagesend.controller.js";

const imageRouter = Router()

imageRouter.post("/upload", auth, upload.single("image"), uploadImagesController)

export default imageRouter