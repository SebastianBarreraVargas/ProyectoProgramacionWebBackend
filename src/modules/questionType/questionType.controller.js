import {
  createQuestionType,
  getAllQuestionTypes,
  getQuestionTypeById,
  updateQuestionType,
  deleteQuestionType
} from './questionType.service.js';

export async function createQuestionTypeController(req, res) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const newType = await createQuestionType(data);
    return res.status(201).json({ success: true, message: 'QuestionType created', data: newType });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllQuestionTypesController(req, res) {
  try {
    const types = await getAllQuestionTypes();
    return res.status(200).json({ success: true, data: types });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getQuestionTypeByIdController(req, res) {
  try {
    const { id } = req.params;
    const type = await getQuestionTypeById(id);
    if (!type) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, data: type });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateQuestionTypeController(req, res) {
  try {
    const { id } = req.params;
    const updatedType = await updateQuestionType(id, req.body);
    if (!updatedType) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, message: 'Updated', data: updatedType });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteQuestionTypeController(req, res) {
  try {
    const { id } = req.params;
    const deletedType = await deleteQuestionType(id);
    if (!deletedType) return res.status(404).json({ success: false, message: 'QuestionType not found' });

    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
