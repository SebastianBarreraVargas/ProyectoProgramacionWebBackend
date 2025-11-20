import { Request, Response } from "express";
import * as QuestionAgeClassificationService from "../services/questionAgeClassification.service";

export const createAACController = async (req: Request, res: Response) => {
    try {
        const newEntry = await QuestionAgeClassificationService.createAnswerAgeClassification(req.body);
        res.status(201).json({ message: "QuestionAgeClassification created", data: newEntry });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllAACController = async (req: Request, res: Response) => {
    try {
        const entries = await QuestionAgeClassificationService.getAllAnswerAgeClassifications();
        res.status(200).json({ data: entries });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAACByIdController = async (req: Request, res: Response) => {
    try {
        const entry = await QuestionAgeClassificationService.getAnswerAgeClassificationById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ data: entry });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateAACController = async (req: Request, res: Response) => {
    try {
        const updated = await QuestionAgeClassificationService.updateAnswerAgeClassification(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteAACController = async (req: Request, res: Response) => {
    try {
        const deleted = await QuestionAgeClassificationService.deleteAnswerAgeClassification(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
