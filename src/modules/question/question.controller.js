import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} from './question.service.js';

export async function createQuestionController(req, res) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const newQuestion = await createQuestion(data);
    return res.status(201).json({ success: true, message: 'Question created', data: newQuestion });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllQuestionsController(req, res) {
  try {
    const questions = await getAllQuestions();
    return res.status(200).json({ success: true, data: questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getQuestionByIdController(req, res) {
  try {
    const { id } = req.params;
    const question = await getQuestionById(id);
    if (!question) return res.status(404).json({ success: false, message: 'Question not found' });

    return res.status(200).json({ success: true, data: question });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateQuestionController(req, res) {
  try {
    const { id } = req.params;
    const updatedQuestion = await updateQuestion(id, req.body);
    if (!updatedQuestion) return res.status(404).json({ success: false, message: 'Question not found' });

    return res.status(200).json({ success: true, message: 'Question updated', data: updatedQuestion });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteQuestionController(req, res) {
  try {
    const { id } = req.params;
    const deletedQuestion = await deleteQuestion(id);
    if (!deletedQuestion) return res.status(404).json({ success: false, message: 'Question not found' });

    return res.status(200).json({ success: true, message: 'Question deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
