import Question from '../models/Question';

interface QuestionInfo { 
    statement: string;
    score: number;
    status?: 'draft' | 'editing' | 'published';
    id_question_type: string;
    difficulty?: 'low' | 'medium' | 'high';
}

export const createQuestion = async (data: QuestionInfo) => {
    return await Question.create(data);
};

export const getAllQuestions = async () => {
    return await Question.find().populate('id_question_type');
};

export const getQuestionById = async (id: string) => {
    return await Question.findById(id).populate('id_question_type');
};

export const getQuestionByType = async (id_question_type: string) => {
    return await Question.findOne({ id_question_type }).populate('id_question_type');
};

export const getQuestionsByStatus = async (status: 'draft' | 'editing' | 'published') => {
    return await Question.find({ status }).populate('id_question_type');
};

export const getQuestionsByDifficulty = async (difficulty: 'low' | 'medium' | 'high') => {
    return await Question.find({ difficulty }).populate('id_question_type');
};

export const updateQuestion = async (id: string, data: QuestionInfo) => {
    return await Question.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('id_question_type');
};

export const deleteQuestion = async (id: string) => {
    return await Question.findByIdAndDelete(id);
};