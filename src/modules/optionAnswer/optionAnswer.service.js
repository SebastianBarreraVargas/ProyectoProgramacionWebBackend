import OptionAnswer from '../../models/optionAnswer.model.js';

export async function createOptionAnswer(data) {
  try {
    const newEntry = new OptionAnswer(data);
    return await newEntry.save();
  } catch (error) {
    throw new Error('Error creating OptionAnswer: ' + error.message);
  }
}

export async function getAllOptionAnswers() {
  try {
    return await OptionAnswer.find()
      .populate('id_question', 'statement')
      .populate('id_answer', 'content')
      .populate('id_question_type', 'name_type')
      .populate('id_option', 'content');
  } catch (error) {
    throw new Error('Error fetching OptionAnswers: ' + error.message);
  }
}

export async function getOptionAnswerById(id) {
  try {
    return await OptionAnswer.findById(id)
      .populate('id_question', 'statement')
      .populate('id_answer', 'content')
      .populate('id_question_type', 'name_type')
      .populate('id_option', 'content');
  } catch (error) {
    throw new Error('Error fetching OptionAnswer: ' + error.message);
  }
}

export async function updateOptionAnswer(id, updateData) {
  try {
    return await OptionAnswer.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating OptionAnswer: ' + error.message);
  }
}

export async function deleteOptionAnswer(id) {
  try {
    return await OptionAnswer.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting OptionAnswer: ' + error.message);
  }
}
