import { Request, Response } from "express";
import * as QuestionAgeClassificationService from "../services/questionAgeClassification.service";

const validatePayload = (body: any): string[] => {
    const errors: string[] = [];
    if (!body || typeof body !== "object") {
        errors.push("Cuerpo de la petición inválido");
        return errors;
    }

    if (body.id_answer === undefined || body.id_answer === null || typeof body.id_answer !== "string" || !body.id_answer.trim()) {
        errors.push("El campo 'id_answer' es requerido y debe ser una cadena no vacía");
    }

    if (body.id_age_classification === undefined || body.id_age_classification === null || typeof body.id_age_classification !== "string" || !body.id_age_classification.trim()) {
        errors.push("El campo 'id_age_classification' es requerido y debe ser una cadena no vacía");
    }

    if (body.notes !== undefined && body.notes !== null && typeof body.notes !== "string") {
        errors.push("El campo 'notes' debe ser una cadena si se proporciona");
    }

    return errors;
};

const validateId = (id?: string): string | null => {
    if (!id || typeof id !== "string" || !id.trim()) return "Id es requerido";
    return null;
};

export const createAACController = async (req: Request, res: Response) => {
    try {
        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

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
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const entry = await QuestionAgeClassificationService.getAnswerAgeClassificationById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ data: entry });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateAACController = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updated = await QuestionAgeClassificationService.updateAnswerAgeClassification(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteAACController = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const deleted = await QuestionAgeClassificationService.deleteAnswerAgeClassification(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
