import { Router } from "express";
import auth from "../middleware/auth.js";
import { getQuestionsHum, getQuestionsLin, postQuestion } from "../controllers/question.controller.js";
import { verifyAdmin } from "../middleware/isAdmin.js";

const questionRouter = Router()

questionRouter.post('/post', auth, verifyAdmin, postQuestion)
questionRouter.get('/get-lin', auth, getQuestionsLin)
questionRouter.get('/get-hum', auth, getQuestionsHum)

export default questionRouter