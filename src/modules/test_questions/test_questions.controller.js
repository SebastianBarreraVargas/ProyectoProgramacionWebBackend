import {
  createTestQuestion,
  getAllTestQuestions,
  getTestQuestionById,
  updateTestQuestion,
  deleteTestQuestion
} from './testQuestions.service.js';

export async function createTestQuestionController(req, res) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const newEntry = await createTestQuestion(data);
    return res.status(201).json({ success: true, message: 'TestQuestion created', data: newEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllTestQuestionsController(req, res) {
  try {
    const entries = await getAllTestQuestions();
    return res.status(200).json({ success: true, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTestQuestionByIdController(req, res) {
  try {
    const { id } = req.params;
    const entry = await getTestQuestionById(id);
    if (!entry) return res.status(404).json({ success: false, message: 'Not found' });

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateTestQuestionController(req, res) {
  try {
    const { id } = req.params;
    const updatedEntry = await updateTestQuestion(id, req.body);
    if (!updatedEntry) return res.status(404).json({ success: false, message: 'Not found' });

    return res.status(200).json({ success: true, message: 'Updated', data: updatedEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteTestQuestionController(req, res) {
  try {
    const { id } = req.params;
    const deletedEntry = await deleteTestQuestion(id);
    if (!deletedEntry) return res.status(404).json({ success: false, message: 'Not found' });

    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
