import AnswerOwnOption from "../models/answerOwnOption.model.js";

export const createAnswerOwnOption = async (data) => {
    try {
        const newAnswer = new AnswerOwnOption(data);
        return await newAnswer.save();
    } catch (error) {
        throw new Error("Error creating AnswerOwnOption: " + error.message);
    }
};
