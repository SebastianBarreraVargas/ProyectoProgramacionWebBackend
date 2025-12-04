import { Request, Response } from "express";
import * as QuestionService from "../services/question.service";

const validatePayload = (body: any): string[] => {
    const errors: string[] = [];
    if (!body || typeof body !== "object") {
        errors.push("Cuerpo de la petición inválido");
        return errors;
    }

    if (!body.text || typeof body.text !== "string" || !body.text.trim()) {
        errors.push("El campo 'text' es requerido y debe ser una cadena no vacía");
    }

    if (body.id_question_type === undefined || body.id_question_type === null || typeof body.id_question_type !== "string" || !body.id_question_type.trim()) {
        errors.push("El campo 'id_question_type' es requerido y debe ser una cadena no vacía");
    }

    if (body.status !== undefined) {
        if (typeof body.status !== "string" || !['draft', 'editing', 'published'].includes(body.status)) {
            errors.push("El campo 'status' inválido. Debe ser 'draft', 'editing' o 'published'");
        }
    }

    if (body.difficulty !== undefined) {
        if (typeof body.difficulty !== "string" || !['low', 'medium', 'high'].includes(body.difficulty)) {
            errors.push("El campo 'difficulty' inválido. Debe ser 'low', 'medium' o 'high'");
        }
    }

    if (body.answers !== undefined) {
        if (!Array.isArray(body.answers) || body.answers.length === 0) {
            errors.push("El campo 'answers' debe ser un arreglo no vacío");
        } else {
            body.answers.forEach((a: any, i: number) => {
                if (!a || typeof a !== "string" || !a.trim()) {
                    errors.push(`La respuesta en 'answers' índice ${i} debe ser una cadena no vacía`);
                }
            });
        }
    }

    return errors;
};

const validateId = (id?: string): string | null => {
    if (!id || typeof id !== "string" || !id.trim()) return "Id es requerido";
    return null;
};

const validateTypeId = (id?: string): string | null => {
    if (!id || typeof id !== "string" || !id.trim()) return "Id de tipo de pregunta es requerido";
    return null;
};

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validatePayload(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const saved = await QuestionService.createQuestion(req.body);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const list = await QuestionService.getAllQuestions();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const item = await QuestionService.getQuestionById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getByType = async (req: Request, res: Response) => {
    try {
        const idError = validateTypeId(req.params.id_question_type);
        if (idError) return res.status(400).json({ message: idError });

        const item = await QuestionService.getQuestionByType(req.params.id_question_type);
        if (!item) return res.status(404).json({ message: "Not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getByStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.params;
        if (!['draft', 'editing', 'published'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'draft', 'editing', or 'published'" });
        }
        const list = await QuestionService.getQuestionsByStatus(status as 'draft' | 'editing' | 'published');
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getByDifficulty = async (req: Request, res: Response) => {
    try {
        const { difficulty } = req.params;
        if (!['low', 'medium', 'high'].includes(difficulty)) {
            return res.status(400).json({ message: "Invalid difficulty. Must be 'low', 'medium', or 'high'" });
        }
        const list = await QuestionService.getQuestionsByDifficulty(difficulty as 'low' | 'medium' | 'high');
        res.status(200).json(list);
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

        const updated = await QuestionService.updateQuestion(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ message: idError });

        const deleted = await QuestionService.deleteQuestion(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
//