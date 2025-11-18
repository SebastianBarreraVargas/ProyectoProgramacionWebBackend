import Question from '../../models/Question.js';

export async function createQuestion(data) {
  try {
    const newQuestion = new Question(data);
    const savedQuestion = await newQuestion.save();
    return savedQuestion;
  } catch (error) {
    throw new Error('Error creating question: ' + error.message);
  }
}

export async function getAllQuestions() {
  try {
    return await Question.find().populate('id_question_type', 'type_name description');
  } catch (error) {
    throw new Error('Error fetching questions: ' + error.message);
  }
}

export async function getQuestionById(id) {
  try {
    return await Question.findById(id).populate('id_question_type', 'type_name description');
  } catch (error) {
    throw new Error('Error fetching question: ' + error.message);
  }
}

export async function updateQuestion(id, updateData) {
  try {
    return await Question.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating question: ' + error.message);
  }
}

export async function deleteQuestion(id) {
  try {
    return await Question.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting question: ' + error.message);
  }
}
