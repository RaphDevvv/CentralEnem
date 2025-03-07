import inLessonModel from "../models/inlesson..model.js";
import questionModel from "../models/question.model.js";
import userModel from "../models/user.model.js";

export const updateInLesson = async (req, res) => {
    try {
        const {qid, userIndex } = req.body;
        const userId = req.userId;
        const question = await questionModel.findById(qid)
        const correctIndex = question.corretaIndex
        const subject = question.prova
    
        let model = await inLessonModel.findOne({ userId: userId });
    
        if (!model) {
            model = new inLessonModel({
                userId: userId,
                subject: subject,
                questionNo: 0, 
                correctQuestions: 0,
            });
            await model.save();  
        }
        
        model.questionNo += 1;
    
        if (correctIndex === userIndex) {
            model.questionsRight += 1;
            model.questionRightArray.push(qid)
        } else {
            model.questionWrongArray.push(qid)
        }

        await model.save();

        return res.json({
            message: "inLesson updated",
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export const deleteInLesson = async (req,res)=>{
    try {
        const userId = req.userId

        await inLessonModel.findOneAndDelete({ userId : userId })

        return res.json({
            message: "inLesson deletado",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const afterLessonCalcs = async (req, res) => {
    try {
        const userId = req.userId;

        const inLesson = await inLessonModel.findOne({ userId });
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found.", error: true });
        }

        if (!inLesson) {
            return res.status(404).json({ message: "No lesson found for the user.", error: true });
        }

        let rightPercent = inLesson.questionNo > 0 ? inLesson.questionsRight / inLesson.questionNo : 0;

        let xpPerQuestion = rightPercent === 1 ? 14 : rightPercent >= 0.8 ? 12 : rightPercent >= 0.6 ? 10 : 8;
        const newXp = inLesson.questionNo * xpPerQuestion;
        user.xp += newXp;

        let newQuestions = 0

        inLesson.questionRightArray.forEach(question => {
            if (user.questionWrongArray.includes(question)) {
                user.questionRightArray.push(question);
                user.questionWrongArray = user.questionWrongArray.filter(q => q !== question);
            }
            else if (!user.questionRightArray.includes(question) && !user.questionWrongArray.includes(question)) {
                user.questionRightArray.push(question);
                newQuestions += 1;
            } else if (user.questionRightArray.includes(question)){

            }
        });

        inLesson.questionWrongArray.forEach(question => {
            if (user.questionRightArray.includes(question)) {
                user.questionWrongArray.push(question);
                user.questionRightArray = user.questionRightArray.filter(q => q !== question);
            }
            else if (!user.questionWrongArray.includes(question) && !user.questionRightArray.includes(question)) {
                user.questionWrongArray.push(question);
                newQuestions += 1;
            } else if (user.questionWrongArray.includes(question)) {

            }
        });

        user.totalQuestions += newQuestions

        user.$__.version = undefined; 
        await user.save();

        await inLessonModel.deleteOne({ userId });

        return res.json({ message: "XP e contagem de questões atualizadas", newXp, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message || error, error: true });
    }
};





