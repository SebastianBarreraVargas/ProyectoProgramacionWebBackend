import QuestionType from '../models/QuestionType';

export async function createQuestionType(data: string) {
  try {
    const newType = new QuestionType(data);
    const savedType = await newType.save();
    return savedType;
  } catch (error) {
    throw new Error('Error creating QuestionType: ' + (error as Error).message);
  }
}

export async function getAllQuestionTypes() {
  try {
    return await QuestionType.find();
  } catch (error) {
    throw new Error('Error fetching QuestionTypes: ' + (error as Error).message);
  }
}

export async function getQuestionTypeById(id: string) {
  try {
    return await QuestionType.findById(id);
  } catch (error) {
    throw new Error('Error fetching QuestionType: ' + (error as Error).message);
  }
}

interface QuestionTypeInfo {
  name_type: string,
  description_type: string
}

export async function updateQuestionType(id: string, updateData: QuestionTypeInfo) {
  try {
    return await QuestionType.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating QuestionType: ' + (error as Error).message);
  }
}

export async function deleteQuestionType(id: string) {
  try {
    return await QuestionType.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting QuestionType: ' + (error as Error).message);
  }
}
