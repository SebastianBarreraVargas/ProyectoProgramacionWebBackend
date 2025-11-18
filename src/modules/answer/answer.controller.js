import {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer
} from './answer.service.js';

export async function createAnswerController(req, res) {
  try {
    const data = req.body;
    if (!data || !data.justification || !data.id_question || !data.id_QuestionType) {
      return res.status(400).json({ success: false, message: 'Incomplete data provided' });
    }

    const newAnswer = await createAnswer(data);
    return res.status(201).json({ success: true, message: 'Answer created', data: newAnswer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllAnswersController(req, res) {
  try {
    const entries = await getAllAnswers();
    return res.status(200).json({ success: true, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAnswerByIdController(req, res) {
  try {
    const { id } = req.params;
    const entry = await getAnswerById(id);
    if (!entry) return res.status(404).json({ success: false, message: 'Answer not found' });

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateAnswerController(req, res) {
  try {
    const { id } = req.params;
    const updatedEntry = await updateAnswer(id, req.body);
    if (!updatedEntry) return res.status(404).json({ success: false, message: 'Answer not found' });

    return res.status(200).json({ success: true, message: 'Answer updated', data: updatedEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteAnswerController(req, res) {
  try {
    const { id } = req.params;
    const deletedEntry = await deleteAnswer(id);
    if (!deletedEntry) return res.status(404).json({ success: false, message: 'Answer not found' });

    return res.status(200).json({ success: true, message: 'Answer deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
