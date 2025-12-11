import mongoose from "mongoose";

const QuestionTypeSchema = new mongoose.Schema(
    {
        name_type: { 
            type: String, 
            required: true, 
            unique: true 
        },
        description_type: { 
            type: String, 
            required: true, 
        }
    }, { timestamps: true }
);

const QuestionType = mongoose.model('QuestionType', QuestionTypeSchema);
export default QuestionType;