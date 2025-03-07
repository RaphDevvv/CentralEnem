import mongoose from "mongoose";

const inLessonSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },

    subject: {
        type: String,
        enum: ["lin", "hum", "nat", "mat"],
        default: null
    },

    questionNo : {
        type: Number,
        default: 0
    },

    questionsRight : {
        type: Number,
        default: 0
    },

    questionRightArray: {
        type: [String],
        default: []
    },

    questionWrongArray: {
        type: [String],
        default: []
    }
})

const inLessonModel = mongoose.model("inLesson", inLessonSchema)

export default inLessonModel