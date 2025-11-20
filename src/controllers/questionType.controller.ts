import { Request, Response } from 'express';
import * as QuestionType from '../services/questionType.service';

export async function createQuestionTypeController(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const newType = await QuestionType.createQuestionType(data);
    return res.status(201).json({ success: true, message: 'QuestionType created', data: newType });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export async function getAllQuestionTypesController(req: Request, res: Response) {
  try {
    const types = await QuestionType.getAllQuestionTypes();
    return res.status(200).json({ success: true, data: types });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export async function getQuestionTypeByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const type = await QuestionType.getQuestionTypeById(id);
    if (!type) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, data: type });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export async function updateQuestionTypeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedType = await QuestionType.updateQuestionType(id, req.body);
    if (!updatedType) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, message: 'Updated', data: updatedType });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export async function deleteQuestionTypeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedType = await QuestionType.deleteQuestionType(id);
    if (!deletedType) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}
