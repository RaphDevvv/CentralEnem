import questionModel from '../models/question.model.js'
import userModel from '../models/user.model.js'

export const postQuestion = async (req,res)=>{
    try {
        const {numero, ano, prova, conteudo, html, comando, alternativas, corretaIndex} = req.body

        if ( !numero || !ano || !prova || !conteudo[0] || !html || !comando || !alternativas[0] || !corretaIndex) {
            return res.status(401).json({
                message: "algum item esta faltando",
                error: true
            })
        }

        const existingQuestion = await questionModel.findOne({ ano, numero });

        if (existingQuestion) {
            return res.status(401).json({
                message: "questão já adicionada",
                error: true
            });
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

export const getQuestionsStats = async (req, res) => {
    try {
        const userId = req.userId;
        const { sub } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", error: true });
        }

        if (!sub) {
            return res.status(404).json({ message: "Materia não fornecida", error: true });
        }

        const correctQuestions = await questionModel.find({ _id: { $in: user.questionRightArray }, prova: sub });
        const wrongQuestions = await questionModel.find({ _id: { $in: user.questionWrongArray }, prova: sub });

        const correctAnswers = correctQuestions.length;
        const wrongAnswers = wrongQuestions.length;

        const correctTopicCount = new Map();
        const wrongTopicCount = new Map();

        const updateTopicCount = (questions, topicCount) => {
            questions.forEach(question => {
                if (Array.isArray(question.conteudo)) {
                    question.conteudo.map(content => content.trim().toLowerCase())
                        .forEach(content => topicCount.set(content, (topicCount.get(content) || 0) + 1));
                }
            });
        };

        updateTopicCount(correctQuestions, correctTopicCount);
        updateTopicCount(wrongQuestions, wrongTopicCount);

        const getTopTopics = (topicCount) =>
            [...topicCount.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([topic, count]) => `${topic}(${count})`);

        return res.json({
            data: {
                correctNo: correctAnswers,
                wrongNo: wrongAnswers,
                totalNo: correctAnswers + wrongAnswers,
                mostCorrectTopics: getTopTopics(correctTopicCount),
                mostWrongTopics: getTopTopics(wrongTopicCount)
            },
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};



