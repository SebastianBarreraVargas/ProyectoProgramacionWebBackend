import {
  createOption,
  getAllOptions,
  getOptionById,
  updateOption,
  deleteOption
} from './option.service.js';

export async function createOptionController(req, res) {
  try {
    const data = req.body;
    if (!data || !data.content) {
      return res.status(400).json({ success: false, message: 'No content provided' });
    }

    const newOption = await createOption(data);
    return res.status(201).json({ success: true, message: 'Option created', data: newOption });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllOptionsController(req, res) {
  try {
    const options = await getAllOptions();
    return res.status(200).json({ success: true, data: options });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getOptionByIdController(req, res) {
  try {
    const { id } = req.params;
    const option = await getOptionById(id);
    if (!option) return res.status(404).json({ success: false, message: 'Option not found' });

    return res.status(200).json({ success: true, data: option });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateOptionController(req, res) {
  try {
    const { id } = req.params;
    const updatedOption = await updateOption(id, req.body);
    if (!updatedOption) return res.status(404).json({ success: false, message: 'Option not found' });

    return res.status(200).json({ success: true, message: 'Option updated', data: updatedOption });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteOptionController(req, res) {
  try {
    const { id } = req.params;
    const deletedOption = await deleteOption(id);
    if (!deletedOption) return res.status(404).json({ success: false, message: 'Option not found' });

    return res.status(200).json({ success: true, message: 'Option deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
