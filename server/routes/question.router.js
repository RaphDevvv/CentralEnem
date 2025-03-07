import { Router } from "express";
import auth from "../middleware/auth.js";
import { getQuestionsHum, getQuestionsLin, getQuestionsMat, getQuestionsNat, getQuestionsStats, postQuestion } from "../controllers/question.controller.js";
import { verifyAdmin } from "../middleware/isAdmin.js";

const questionRouter = Router()

questionRouter.post('/post', auth, verifyAdmin, postQuestion)
questionRouter.get('/admin-check', auth, verifyAdmin)
questionRouter.get('/get-lin', auth, getQuestionsLin)
questionRouter.get('/get-hum', auth, getQuestionsHum)
questionRouter.get('/get-nat', auth, getQuestionsNat)
questionRouter.get('/get-mat', auth, getQuestionsMat)
questionRouter.post('/get-stats', auth, getQuestionsStats)

export default questionRouter