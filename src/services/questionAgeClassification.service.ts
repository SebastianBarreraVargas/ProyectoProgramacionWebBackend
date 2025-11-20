import AnswerAgeClassification from "../models/QuestionAgeClassification";
import { Types } from "mongoose";

export const createAnswerAgeClassification = async (data: string) => {
    try {
        const entry = new AnswerAgeClassification(data);
        return await entry.save();
    } catch (err) {
        throw new Error("Error creating AnswerAgeClassification: " + (err as Error).message);
    }
};

export const getAllAnswerAgeClassifications = async () => {
    try {
        return await AnswerAgeClassification.find()
            .populate("id_answer")
            .populate("id_age_classification");
    } catch (err) {
        throw new Error("Error fetching AnswerAgeClassifications: " + (err as Error).message);
    }
};

export const getAnswerAgeClassificationById = async (id: string) => {
    try {
        return await AnswerAgeClassification.findById(id)
            .populate("id_answer")
            .populate("id_age_classification");
    } catch (err) {
        throw new Error("Error fetching AnswerAgeClassification: " + (err as Error).message);
    }
};

interface QuestionAgeClassificationInfo {
    id_question: Types.ObjectId,
    id_age_classification: Types.ObjectId
}

export const updateAnswerAgeClassification = async (id: string, data: QuestionAgeClassificationInfo) => {
    try {
        return await AnswerAgeClassification.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        throw new Error("Error updating AnswerAgeClassification: " + (err as Error).message);
    }
};

export const deleteAnswerAgeClassification = async (id: string) => {
    try {
        return await AnswerAgeClassification.findByIdAndDelete(id);
    } catch (err) {
        throw new Error("Error deleting AnswerAgeClassification: " + (err as Error).message);
    }
};
