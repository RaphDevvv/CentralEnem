import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'
import jwt  from "jsonwebtoken";
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body
        
        const alreadyName = await userModel.findOne({ name })
        const alreadyEmail = await userModel.findOne({ email })

        if (alreadyName) {
            return res.status(500).json({
                message: "Nome já registrado",
                error: true
            })
        }

        if (alreadyEmail) {
            return res.status(500).json({
                message: "Email já registrado",
                error: true
            })
        }
       
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = userModel ({
            name: name,
            email : email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()

        const user = await userModel.findOne({ email })

        const checkPassword = await bcrypt.compare(password, user.password)

        const token = await generateToken(user._id)

        res.cookie('token', token, cookiesOption)

        return res.json({
            message: "registrado e logado com sucesso",
            error: false,
            success: true,
            data: {
                token
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

const cookiesOption = {
    httpOnly : true,
    secure : true,
    sameSite : "None"
}

export const loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "provide email and password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "email not registered",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                message: "wrong password, please try again",
                error: true,
                success: false
            })
        }

        const token = await generateToken(user._id)

        res.cookie('token', token, cookiesOption)

        return res.json({
            message: "login efetuado com succeso",
            error: false,
            success: true,
            data: {
                token
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const logoutUser = async (req,res)=>{
    try {
        const userid = req.userId
        
        res.clearCookie('token', cookiesOption);

        return res.json({
            message: "usuario deslogado com sucesso",
            success: true

        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const getUserIdTest = async (req,res)=>{
    try {
        const userId = req.userId

        return res.json({
            data: userId,
            success: true,
            message: "id aqui"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message || error,
            error: true
        })
    }
}

export const fetchUserDetails = async (req,res)=>{
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                message: "id do usuario não encontrado, não logado",
                error: true
            })
        }

        const details = await userModel.findById({ _id: userId }).select('-password')

        if (!details) {
            return res.status(404).json({
                message: "usuario não encontrado",
                error: true
            })
        }

        res.json({
            message: "detalhes do usuario",
            data: details,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const uploadAvatar = async (req,res)=>{
    try {
        const userId = req.userId
        const { imageLink } = req.body

        if (!userId || !imageLink) {
            return res.status(401).json({
                message: "imagem ou id do usuario não recebidos",
                error: true
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(userId,  { avatar: imageLink })

        return res.json({
            message: "image uploaded",
            success: true,
            avatar: imageLink
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const setLastLessonDate = async (req, res) => {
    try {
        const userId = req.userId;

        // Get current date in UTC (MongoDB stores dates in UTC by default)
        const currentDate = new Date();

        // Update the user's lastLessonDate
        await userModel.findByIdAndUpdate(
            userId, 
            { lastLesson: currentDate },
            { new: true } // Returns the updated document
        );

        return res.status(200).json({
            message: "Last lesson date updated successfully!",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export const setStreakAfterLesson = async (req, res) => {
    try {
        const userId = req.userId;
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

        const user = await userModel.findById(userId, { lastLesson: 1, streakNo: 1 });

        if (!user?.lastLesson || user?.streakNo === 0) {
            const prev = user?.streakNo || 0;  
            await userModel.findByIdAndUpdate(userId, { lastLesson: todayUTC, streakNo: prev + 1 });
            return res.json({ updatePeriod: true });
        }

        const lastLesson = new Date(user.lastLesson);

        if (todayUTC.toISOString() === lastLesson.toISOString()) {
            await userModel.findByIdAndUpdate(userId, { lastLesson: todayUTC });
            return res.json({ updatePeriod: false });
        }

        const diffInDays = Math.floor((todayUTC - lastLesson) / (1000 * 60 * 60 * 24));

        if (diffInDays === 1) {
            const prev = user?.streakNo || 0;
            await userModel.findByIdAndUpdate(userId, { lastLesson: todayUTC, streakNo: prev + 1 });
            return res.json({ updatePeriod: true });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export const checkStreak = async (req, res) => {
    try {
        const userId = req.userId;
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

        const user = await userModel.findById(userId, { lastLesson: 1, streakNo: 1 });
        const lastLesson = new Date(user?.lastLesson);
        const lastLessonUTC = new Date(Date.UTC(lastLesson.getUTCFullYear(), lastLesson.getUTCMonth(), lastLesson.getUTCDate()));

        const diffInDays = Math.floor((todayUTC - lastLessonUTC) / (1000 * 60 * 60 * 24));

        if (diffInDays > 1) {
            await userModel.findByIdAndUpdate(userId, { streakNo: 0 }, { new: true });
            return res.json({
                message: "Streak resetada",
                reset: true,
                success: true
            });
        } else {
            return res.json({
                message: "Streak em dia",
                success: true
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export const rankList = async (req, res) => {
    try {
        const users = await userModel.find({}, 'avatar name xp')
            .sort({ xp: -1 })
            .limit(10);

        return res.status(200).json({
            data: users,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export const findUserByName = async (req,res) => {
    try {
        const { name } = req.body

        const user = await userModel.findOne({name})

        return res.json({
            success:true,
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}