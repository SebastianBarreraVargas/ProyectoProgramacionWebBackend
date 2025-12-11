import { Request, Response } from 'express';
import * as QuestionType from '../services/questionType.service';

const validateId = (id?: string): string | null => {
  if (!id || typeof id !== 'string' || !id.trim()) return 'Id es requerido';
  return null;
};

const validatePayload = (body: { name_type: string; }): string[] => {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') {
    errors.push('Cuerpo de la petición inválido');
    return errors;
  }
  if (!body.name_type || typeof body.name_type !== 'string' || !body.name_type.trim()) {
    errors.push("El campo 'name_type' es requerido y debe ser una cadena no vacía");
  }
  return errors;
};

export async function createQuestionTypeController(req: Request, res: Response) {
  try {
    const errors = validatePayload(req.body);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    const newType = await QuestionType.createQuestionType(req.body);
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
    const idError = validateId(req.params.id);
    if (idError) return res.status(400).json({ success: false, message: idError });

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
    const idError = validateId(req.params.id);
    if (idError) return res.status(400).json({ success: false, message: idError });

    const payloadErrors = (() => {
      const errors: string[] = [];
      if (!req.body || typeof req.body !== 'object') {
        errors.push('Cuerpo de la petición inválido');
        return errors;
      }
      if (req.body.name !== undefined) {
        if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
          errors.push("El campo 'name' debe ser una cadena no vacía si se proporciona");
        }
      }
      return errors;
    })();

    if (payloadErrors.length > 0) return res.status(400).json({ success: false, errors: payloadErrors });

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
    const idError = validateId(req.params.id);
    if (idError) return res.status(400).json({ success: false, message: idError });

    const { id } = req.params;
    const deletedType = await QuestionType.deleteQuestionType(id);
    if (!deletedType) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
}
//