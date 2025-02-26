import { Router } from "express";
import auth from "../middleware/auth.js";
import { getQuestionsHum, getQuestionsLin, getQuestionsNat, postQuestion } from "../controllers/question.controller.js";
import { verifyAdmin } from "../middleware/isAdmin.js";

const questionRouter = Router()

questionRouter.post('/post', auth, verifyAdmin, postQuestion)
questionRouter.get('/admin-check', auth, verifyAdmin)
questionRouter.get('/get-lin', auth, getQuestionsLin)
questionRouter.get('/get-hum', auth, getQuestionsHum)
questionRouter.get('/get-nat', auth, getQuestionsNat)

export default questionRouter