import mongoose from "mongoose";

const testQuestionsSchema = new mongoose.Schema(
  {
    id_question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    id_test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }
  },
  { timestamps: true }
);

testQuestionsSchema.index({ id_test: 1, id_question: 1 }, { unique: true });

const TestQuestions = mongoose.model('TestQuestions', testQuestionsSchema);
export default TestQuestions;
