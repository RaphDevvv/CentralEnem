import inLessonModel from "../models/inlesson..model.js";
import questionModel from "../models/question.model.js";
import userModel from "../models/user.model.js";

export const updateInLesson = async (req, res) => {
    try {
        const {qid, userIndex } = req.body;
        const userId = req.userId;
        const question = await questionModel.findById(qid)
        const correctIndex = question.corretaIndex
    
        let model = await inLessonModel.findOne({ userId: userId });
    
        if (!model) {
            model = new inLessonModel({
                userId: userId,
                questionNo: 0, 
                correctQuestions: 0,
            });
            await model.save();  
        }
        
        model.questionNo += 1;
    
        if (correctIndex === userIndex) {
            model.questionsRight += 1;
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

export const afterLessonCalcs = async (req,res)=>{
    try {
        const userId = req.userId

        const inLesson = await inLessonModel.findOne({ userId : userId })
        const user = await userModel.findOne({ _id : userId })

        let rightPercent = 0; 

        if (inLesson && inLesson.questionNo > 0) {
             rightPercent = inLesson?.questionsRight / inLesson?.questionNo;
        } 

        let xpPerQuestion = 0

        if (rightPercent === 1) {
            xpPerQuestion = 14; 
        } else if (rightPercent >= 0.8) {
            xpPerQuestion = 12;
        } else if (rightPercent >= 0.6) {
            xpPerQuestion = 10; 
        } else if (rightPercent < 0.6) {
            xpPerQuestion = 8
        }

        const newXp = inLesson.questionNo * xpPerQuestion

        user.xp += newXp
        user.totalQuestions += inLesson.questionNo
        user.save()

        await inLessonModel.findOneAndDelete({ userId : userId })
   
        return res.json({
            message: "xp e numero de questoes editados",
            newXp: newXp,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error.message,
            error: true
        })
    }
}