// src/modules/testQuestions/testQuestions.service.js
import TestQuestions from '../../models/TestQuestions.js';

export async function createTestQuestion(data) {
  try {
    const newEntry = new TestQuestions(data);
    const savedEntry = await newEntry.save();
    return savedEntry;
  } catch (error) {
    throw new Error('Error creating TestQuestion: ' + error.message);
  }
}

export async function getAllTestQuestions() {
  try {
    return await TestQuestions.find()
      .populate('id_test', 'title')
      .populate('id_question', 'question_text');
  } catch (error) {
    throw new Error('Error fetching TestQuestions: ' + error.message);
  }
}

export async function getTestQuestionById(id) {
  try {
    return await TestQuestions.findById(id)
      .populate('id_test', 'title')
      .populate('id_question', 'question_text');
  } catch (error) {
    throw new Error('Error fetching TestQuestion: ' + error.message);
  }
}

export async function updateTestQuestion(id, updateData) {
  try {
    return await TestQuestions.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating TestQuestion: ' + error.message);
  }
}

export async function deleteTestQuestion(id) {
  try {
    return await TestQuestions.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting TestQuestion: ' + error.message);
  }
}
