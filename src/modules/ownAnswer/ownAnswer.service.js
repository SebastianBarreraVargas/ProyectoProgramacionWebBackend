import OwnAnswer from '../../models/ownAnswer.model.js';

export async function createOwnAnswer(data) {
  try {
    const newEntry = new OwnAnswer(data);
    return await newEntry.save();
  } catch (error) {
    throw new Error('Error creating OwnAnswer: ' + error.message);
  }
}

export async function getAllOwnAnswers() {
  try {
    return await OwnAnswer.find()
      .populate('id_user', 'username')
      .populate('id_question', 'statement')
      .populate('id_questionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching OwnAnswers: ' + error.message);
  }
}

export async function getOwnAnswerById(id) {
  try {
    return await OwnAnswer.findById(id)
      .populate('id_user', 'username')
      .populate('id_question', 'statement')
      .populate('id_questionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching OwnAnswer: ' + error.message);
  }
}

export async function updateOwnAnswer(id, updateData) {
  try {
    return await OwnAnswer.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating OwnAnswer: ' + error.message);
  }
}

export async function deleteOwnAnswer(id) {
  try {
    return await OwnAnswer.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting OwnAnswer: ' + error.message);
  }
}
