import { Request, Response } from "express";
import * as AgeClassificationService from "../services/ageClassification.service";

const validatePayload = (body: any): string[] => {
    const errors: string[] = [];
    if (!body || typeof body !== "object") {
        errors.push("Cuerpo de la petición inválido");
        return errors;
    }

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
        errors.push("El campo 'name' es requerido y debe ser una cadena no vacía");
    }

    if (body.minAge === undefined || typeof body.minAge !== "number" || Number.isNaN(body.minAge)) {
        errors.push("El campo 'minAge' es requerido y debe ser un número");
    }

    if (body.maxAge === undefined || typeof body.maxAge !== "number" || Number.isNaN(body.maxAge)) {
        errors.push("El campo 'maxAge' es requerido y debe ser un número");
    }

    if (typeof body.minAge === "number" && typeof body.maxAge === "number") {
        if (body.minAge < 0) errors.push("'minAge' no puede ser negativo");
        if (body.maxAge < 0) errors.push("'maxAge' no puede ser negativo");
        if (body.minAge > body.maxAge) errors.push("'minAge' no puede ser mayor que 'maxAge'");
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
        const list = await AgeClassificationService.getAllAgeClassifications();
        res.status(200).json(list);
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