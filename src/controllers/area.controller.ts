import { Request, Response } from "express";
import * as AreaService from "../services/area.service";

const validatePayload = (body: any): string[] => {
    const errors: string[] = [];
    if (!body || typeof body !== "object") {
        errors.push("Cuerpo de la petición inválido");
        return errors;
    }

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
        errors.push("El campo 'name' es requerido y debe ser una cadena no vacía");
    }

    if (body.id_materia === undefined || body.id_materia === null || typeof body.id_materia !== "string" || !body.id_materia.trim()) {
        errors.push("El campo 'id_materia' es requerido y debe ser una cadena no vacía");
    }

    if (body.descripcion !== undefined && body.descripcion !== null && typeof body.descripcion !== "string") {
        errors.push("El campo 'descripcion' debe ser una cadena si se proporciona");
    }

    return errors;
};

const validateId = (id?: string): string | null => {
    if (!id || typeof id !== "string" || !id.trim()) return "Id es requerido";
    return null;
};

const validateIdMateria = (id_materia?: string): string | null => {
    if (!id_materia || typeof id_materia !== "string" || !id_materia.trim()) return "Id de materia es requerido";
    return null;
};

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const saved = await AreaService.createArea(req.body);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const list = await AreaService.getAllAreas();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const item = await AreaService.getAreaById(req.params.id);
        if (!item) return res.status(404).json({ message: "No encontrado" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getByMateria = async (req: Request, res: Response) => {
    try {
        const idError = validateIdMateria(req.params.id_materia);
        if (idError) return res.status(400).json({ message: idError });

        const item = await AreaService.getAreaByMateria(req.params.id_materia);
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

        const updated = await AreaService.updateArea(req.params.id, req.body);
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

        const deleted = await AreaService.deleteArea(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No encontrado" });
        res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
//