import {
  createOwnAnswer,
  getAllOwnAnswers,
  getOwnAnswerById,
  updateOwnAnswer,
  deleteOwnAnswer
} from './ownAnswer.service.js';

export async function createOwnAnswerController(req, res) {
  try {
    const data = req.body;
    if (!data || !data.id_user || !data.id_question || !data.id_questionType) {
      return res.status(400).json({ success: false, message: 'Incomplete data provided' });
    }

    const newEntry = await createOwnAnswer(data);
    return res.status(201).json({ success: true, message: 'OwnAnswer created', data: newEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllOwnAnswersController(req, res) {
  try {
    const entries = await getAllOwnAnswers();
    return res.status(200).json({ success: true, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getOwnAnswerByIdController(req, res) {
  try {
    const { id } = req.params;
    const entry = await getOwnAnswerById(id);
    if (!entry) return res.status(404).json({ success: false, message: 'OwnAnswer not found' });

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateOwnAnswerController(req, res) {
  try {
    const { id } = req.params;
    const updatedEntry = await updateOwnAnswer(id, req.body);
    if (!updatedEntry) return res.status(404).json({ success: false, message: 'OwnAnswer not found' });

    return res.status(200).json({ success: true, message: 'OwnAnswer updated', data: updatedEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteOwnAnswerController(req, res) {
  try {
    const { id } = req.params;
    const deletedEntry = await deleteOwnAnswer(id);
    if (!deletedEntry) return res.status(404).json({ success: false, message: 'OwnAnswer not found' });

    return res.status(200).json({ success: true, message: 'OwnAnswer deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
