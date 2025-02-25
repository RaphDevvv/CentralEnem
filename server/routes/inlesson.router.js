import { Router } from "express";
import auth from "../middleware/auth.js";
import { afterLessonCalcs, deleteInLesson, updateInLesson } from "../controllers/inlesson.controller.js";


const inLessonRouter = Router()

inLessonRouter.post("/update-create", auth, updateInLesson)
inLessonRouter.delete("/delete", auth ,deleteInLesson)
inLessonRouter.post("/after-calcs", auth, afterLessonCalcs)

export default inLessonRouter