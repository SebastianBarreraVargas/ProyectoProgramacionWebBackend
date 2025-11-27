import { Request, Response } from "express";
import * as SubjectService from "../services/subject.service";

export const create = async (req: Request, res: Response) => {
    try {
        const saved = await SubjectService.createSubject(req.body);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const list = await SubjectService.getAllSubjects();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const item = await SubjectService.getSubjectById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const updated = await SubjectService.updateSubject(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const deleted = await SubjectService.deleteSubject(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
