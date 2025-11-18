import Answer from '../../models/answer.model.js';

export async function createAnswer(data) {
  try {
    const newEntry = new Answer(data);
    return await newEntry.save();
  } catch (error) {
    throw new Error('Error creating Answer: ' + error.message);
  }
}

export async function getAllAnswers() {
  try {
    return await Answer.find()
      .populate('id_question', 'statement')
      .populate('id_QuestionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching Answers: ' + error.message);
  }
}

export async function getAnswerById(id) {
  try {
    return await Answer.findById(id)
      .populate('id_question', 'statement')
      .populate('id_QuestionType', 'name_type');
  } catch (error) {
    throw new Error('Error fetching Answer: ' + error.message);
  }
}

export async function updateAnswer(id, updateData) {
  try {
    return await Answer.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating Answer: ' + error.message);
  }
}

export async function deleteAnswer(id) {
  try {
    return await Answer.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting Answer: ' + error.message);
  }
}
