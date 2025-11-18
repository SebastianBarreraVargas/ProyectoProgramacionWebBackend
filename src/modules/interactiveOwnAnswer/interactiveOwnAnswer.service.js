import InteractiveOwnAnswer from '../../models/InteractiveOwnAnswer.js';

export async function createInteractiveOwnAnswer(data) {
  try {
    const newEntry = new InteractiveOwnAnswer(data);
    return await newEntry.save();
  } catch (error) {
    throw new Error('Error creating InteractiveOwnAnswer: ' + error.message);
  }
}

export async function getAllInteractiveOwnAnswers() {
  try {
    return await InteractiveOwnAnswer.find()
      .populate('id_couple')
      .populate('id_ownAnswer')
      .populate('id_user', 'name email')
      .populate('id_question', 'question_text')
      .populate('id_questionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching InteractiveOwnAnswers: ' + error.message);
  }
}

export async function getInteractiveOwnAnswerById(id) {
  try {
    return await InteractiveOwnAnswer.findById(id)
      .populate('id_couple')
      .populate('id_ownAnswer')
      .populate('id_user', 'name email')
      .populate('id_question', 'question_text')
      .populate('id_questionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching InteractiveOwnAnswer: ' + error.message);
  }
}

export async function updateInteractiveOwnAnswer(id, updateData) {
  try {
    return await InteractiveOwnAnswer.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating InteractiveOwnAnswer: ' + error.message);
  }
}

export async function deleteInteractiveOwnAnswer(id) {
  try {
    return await InteractiveOwnAnswer.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting InteractiveOwnAnswer: ' + error.message);
  }
}
