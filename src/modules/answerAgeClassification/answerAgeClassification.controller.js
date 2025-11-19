import {
    createAnswerAgeClassification,
    getAllAnswerAgeClassifications,
    getAnswerAgeClassificationById,
    updateAnswerAgeClassification,
    deleteAnswerAgeClassification
} from "./answerAgeClassification.service.js";

export const createAACController = async (req, res) => {
    try {
        const newEntry = await createAnswerAgeClassification(req.body);
        res.status(201).json({ message: "AnswerAgeClassification created", data: newEntry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAACController = async (req, res) => {
    try {
        const entries = await getAllAnswerAgeClassifications();
        res.status(200).json({ data: entries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAACByIdController = async (req, res) => {
    try {
        const entry = await getAnswerAgeClassificationById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ data: entry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAACController = async (req, res) => {
    try {
        const updated = await updateAnswerAgeClassification(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAACController = async (req, res) => {
    try {
        const deleted = await deleteAnswerAgeClassification(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
