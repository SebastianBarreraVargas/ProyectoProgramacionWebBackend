import { createAnswerOwnOption } from "../services/answerOwnOption.service.js";

export const postAnswerOwnOption = async (req, res) => {
    try {
        const saved = await createAnswerOwnOption(req.body);
        return res.status(201).json({
            message: "AnswerOwnOption created successfully",
            data: saved
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating AnswerOwnOption",
            error: error.message
        });
    }
};
