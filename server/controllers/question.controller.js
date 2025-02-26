import questionModel from '../models/question.model.js'

export const postQuestion = async (req,res)=>{
    try {
        const {numero, ano, prova, conteudo, html, comando, alternativas, corretaIndex} = req.body

        if ( !numero || !ano || !prova || !conteudo[0] || !html || !comando || !alternativas[0] || !corretaIndex) {
            return res.status(401).json({
                message: "algum item esta faltando",
                error: true
            })
        }

        const question = new questionModel({
            numero, ano, prova, conteudo, html, comando, alternativas, corretaIndex
        })

        const saveQuestion = await question.save()

        return res.json({
            message: "questão adicionada com sucesso",
            success: true,
            question: question
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const getQuestionsLin = async (req, res) => {
    try {
        const find = await questionModel.aggregate([
            { $match: { prova: "lin" } }, 
            { $sample: { size: 5 } } 
        ])

        return res.json({
            message: "questões",
            data: find,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    } 
}

export const getQuestionsHum = async (req, res) => {
    try {
        const find = await questionModel.aggregate([
            { $match: { prova: "hum" } }, 
            { $sample: { size: 5 } } 
        ])

        return res.json({
            message: "questões",
            data: find,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    } 
}

export const getQuestionsNat = async (req, res) => {
    try {
        const find = await questionModel.aggregate([
            { $match: { prova: "nat" } }, 
            { $sample: { size: 5 } } 
        ])

        return res.json({
            message: "questões",
            data: find,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    } 
}

export const getQuestionsMat = async (req, res) => {
    try {
        const find = await questionModel.aggregate([
            { $match: { prova: "mat" } }, 
            { $sample: { size: 5 } } 
        ])

        return res.json({
            message: "questões",
            data: find,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    } 
}