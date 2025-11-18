import QuestionType from '../../models/QuestionType.js';

export async function createQuestionType(data) {
  try {
    const newType = new QuestionType(data);
    const savedType = await newType.save();
    return savedType;
  } catch (error) {
    throw new Error('Error creating QuestionType: ' + error.message);
  }
}

export async function getAllQuestionTypes() {
  try {
    return await QuestionType.find();
  } catch (error) {
    throw new Error('Error fetching QuestionTypes: ' + error.message);
  }
}

export async function getQuestionTypeById(id) {
  try {
    return await QuestionType.findById(id);
  } catch (error) {
    throw new Error('Error fetching QuestionType: ' + error.message);
  }
}

export async function updateQuestionType(id, updateData) {
  try {
    return await QuestionType.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating QuestionType: ' + error.message);
  }
}

export async function deleteQuestionType(id) {
  try {
    return await QuestionType.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting QuestionType: ' + error.message);
  }
}
