import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Provide your name']
        },

        email: {
            type: String,
            required: [true, 'Provide your email'],
            unique: true
        },

        password: {
            type: String,
            required: [true, 'Provide your password']
        },

        avatar: {
            type: String,
            default: ""
        },

        xp: {
            type: Number,
            default: 0
        },

        streakNo: {
            type: Number,
            default: 0
        },

        lastLesson: {
            type: Date,
            default: ""
        },
        
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("usuarios", userSchema);

export default userModel;
