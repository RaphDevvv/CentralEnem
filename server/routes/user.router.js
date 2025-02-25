import { Router } from "express";
import {setStreakAfterLesson, fetchUserDetails, loginUser, logoutUser, registerUser, setLastLessonDate, uploadAvatar, checkStreak, rankList} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const useRouter = Router()

useRouter.post("/register", registerUser)
useRouter.post("/login", loginUser)
useRouter.post("/logout", auth, logoutUser)
useRouter.get("/get", auth, fetchUserDetails)
useRouter.post("/logout", auth, logoutUser)
useRouter.put('/upload-avatar', auth, uploadAvatar)
useRouter.post('/set-last-lesson-date', auth, setLastLessonDate)
useRouter.put('/set-streak', auth, setStreakAfterLesson)
useRouter.put('/check-streak', auth, checkStreak)
useRouter.get('/users-rank', auth, rankList)

export default useRouter