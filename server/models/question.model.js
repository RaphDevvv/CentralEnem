import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    },

    ano: {
        type: Number,
        required: true
    },

    prova: {
        type: String,
        required: true,
        enum: ["lin", "hum", "nat", "mat"] 
    },

    conteudo: {
        type: [String]
    },
    
    html: {
        type: String,
        required: true
    },

    comando: {
        type: String,
        required: true
    },

    alternativas: {
        type: [String],
        required: true
    },
    
    corretaIndex: {
        type: Number,
        required: true
    }
    
})

const questionModel = mongoose.model("questoes", questionSchema)

export default questionModel