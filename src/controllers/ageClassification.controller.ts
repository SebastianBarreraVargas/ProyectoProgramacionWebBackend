import { Request, Response } from "express";
import * as AgeClassificationService from "../services/ageClassification.service";

const validatePayload = (body: { desc_classification: string; starting_age: number; ending_age: number; }): string[] => {
    const errors: string[] = [];
    if (!body || typeof body !== "object") {
        errors.push("Cuerpo de la petición inválido");
        return errors;
    }

    if (!body.desc_classification || typeof body.desc_classification !== "string" || !body.desc_classification.trim()) {
        errors.push("El campo 'name' es requerido y debe ser una cadena no vacía");
    }

    if (body.starting_age === undefined || typeof body.starting_age !== "number" || Number.isNaN(body.starting_age)) {
        errors.push("El campo 'starting_age' es requerido y debe ser un número");
    }

    if (body.ending_age === undefined || typeof body.ending_age !== "number" || Number.isNaN(body.ending_age)) {
        errors.push("El campo 'ending_age' es requerido y debe ser un número");
    }

    if (typeof body.starting_age === "number" && typeof body.ending_age === "number") {
        if (body.starting_age < 0) errors.push("'starting_age' no puede ser negativo");
        if (body.ending_age < 0) errors.push("'ending_age' no puede ser negativo");
        if (body.starting_age > body.ending_age) errors.push("'starting_age' no puede ser mayor que 'ending_age'");
    }

    return errors;
};

const validateId = (id?: string): string | null => {
    if (!id || typeof id !== "string" || !id.trim()) return "Id es requerido";
    return null;
};

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const saved = await AgeClassificationService.createAgeClassification(req.body);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const user_payload = req.user;
        const list = await AgeClassificationService.getAllAgeClassifications();
        res.status(200).json({ data: list, user_data: user_payload });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const item = await AgeClassificationService.getAgeClassificationById(req.params.id);
        if (!item) return res.status(404).json({ message: "No encontrado" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updated = await AgeClassificationService.updateAgeClassification(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "No encontrado" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const deleted = await AgeClassificationService.deleteAgeClassification(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No encontrado" });
        res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};