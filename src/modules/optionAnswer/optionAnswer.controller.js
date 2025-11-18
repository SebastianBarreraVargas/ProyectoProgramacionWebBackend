import {
  createOptionAnswer,
  getAllOptionAnswers,
  getOptionAnswerById,
  updateOptionAnswer,
  deleteOptionAnswer
} from './optionAnswer.service.js';

export async function createOptionAnswerController(req, res) {
  try {
    const data = req.body;
    if (!data || !data.id_question || !data.id_answer || !data.id_question_type || !data.id_option) {
      return res.status(400).json({ success: false, message: 'Incomplete data provided' });
    }

    const newEntry = await createOptionAnswer(data);
    return res.status(201).json({ success: true, message: 'OptionAnswer created', data: newEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllOptionAnswersController(req, res) {
  try {
    const entries = await getAllOptionAnswers();
    return res.status(200).json({ success: true, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getOptionAnswerByIdController(req, res) {
  try {
    const { id } = req.params;
    const entry = await getOptionAnswerById(id);
    if (!entry) return res.status(404).json({ success: false, message: 'OptionAnswer not found' });

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateOptionAnswerController(req, res) {
  try {
    const { id } = req.params;
    const updatedEntry = await updateOptionAnswer(id, req.body);
    if (!updatedEntry) return res.status(404).json({ success: false, message: 'OptionAnswer not found' });

    return res.status(200).json({ success: true, message: 'OptionAnswer updated', data: updatedEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteOptionAnswerController(req, res) {
  try {
    const { id } = req.params;
    const deletedEntry = await deleteOptionAnswer(id);
    if (!deletedEntry) return res.status(404).json({ success: false, message: 'OptionAnswer not found' });

    return res.status(200).json({ success: true, message: 'OptionAnswer deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
