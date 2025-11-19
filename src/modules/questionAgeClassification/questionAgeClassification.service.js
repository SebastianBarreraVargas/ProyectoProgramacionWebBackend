import AnswerAgeClassification from "../../models/QuestionAgeClassification.js";

export const createAnswerAgeClassification = async (data) => {
    try {
        const entry = new AnswerAgeClassification(data);
        return await entry.save();
    } catch (err) {
        throw new Error("Error creating AnswerAgeClassification: " + err.message);
    }
};

export const getAllAnswerAgeClassifications = async () => {
    try {
        return await AnswerAgeClassification.find()
            .populate("id_answer")
            .populate("id_age_classification");
    } catch (err) {
        throw new Error("Error fetching AnswerAgeClassifications: " + err.message);
    }
};

export const getAnswerAgeClassificationById = async (id) => {
    try {
        return await AnswerAgeClassification.findById(id)
            .populate("id_answer")
            .populate("id_age_classification");
    } catch (err) {
        throw new Error("Error fetching AnswerAgeClassification: " + err.message);
    }
};

export const updateAnswerAgeClassification = async (id, data) => {
    try {
        return await AnswerAgeClassification.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        throw new Error("Error updating AnswerAgeClassification: " + err.message);
    }
};

export const deleteAnswerAgeClassification = async (id) => {
    try {
        return await AnswerAgeClassification.findByIdAndDelete(id);
    } catch (err) {
        throw new Error("Error deleting AnswerAgeClassification: " + err.message);
    }
};
