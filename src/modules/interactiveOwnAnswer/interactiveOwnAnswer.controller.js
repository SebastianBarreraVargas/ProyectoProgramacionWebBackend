import {
  createInteractiveOwnAnswer,
  getAllInteractiveOwnAnswers,
  getInteractiveOwnAnswerById,
  updateInteractiveOwnAnswer,
  deleteInteractiveOwnAnswer
} from './interactiveOwnAnswer.service.js';

export async function createInteractiveOwnAnswerController(req, res) {
  try {
    const data = req.body;

    if (!data.id_ownAnswer || !data.id_user || !data.id_question || !data.id_questionType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newEntry = await createInteractiveOwnAnswer(data);
    return res.status(201).json({ success: true, message: "InteractiveOwnAnswer created", data: newEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllInteractiveOwnAnswerController(req, res) {
  try {
    const entries = await getAllInteractiveOwnAnswers();
    return res.status(200).json({ success: true, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getInteractiveOwnAnswerByIdController(req, res) {
  try {
    const { id } = req.params;
    const entry = await getInteractiveOwnAnswerById(id);

    if (!entry) return res.status(404).json({ success: false, message: 'Not found' });

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateInteractiveOwnAnswerController(req, res) {
  try {
    const { id } = req.params;
    const updated = await updateInteractiveOwnAnswer(id, req.body);

    if (!updated) return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({ success: true, message: "Updated", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteInteractiveOwnAnswerController(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteInteractiveOwnAnswer(id);

    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
