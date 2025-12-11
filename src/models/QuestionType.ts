import mongoose from "mongoose";

const QuestionTypeSchema = new mongoose.Schema(
    {
        name_type: {
            type: String,
            required: true,
            unique: false
        },
        description_type: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

const QuestionType = mongoose.model('QuestionType', QuestionTypeSchema);
export default QuestionType;