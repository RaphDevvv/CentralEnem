import mongoose from "mongoose";

const inLessonSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },

    questionNo : {
        type: Number,
        default: 0
    },

    questionsRight : {
        type: Number,
        default: 0
    }
})

const inLessonModel = mongoose.model("inLesson", inLessonSchema)

export default inLessonModel