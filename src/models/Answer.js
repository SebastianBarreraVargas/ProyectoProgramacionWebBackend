import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        justification: { 
            type: String, 
            required: true, 
            unique: false 
        },
        id_question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        id_QuestionType: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'QuestionType', 
            required: true 
        }
    }, { timestamps: true }
);

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;