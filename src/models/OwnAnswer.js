import mongoose from "mongoose";

const ownAnswerSchema = new mongoose.Schema(
    {
        id_user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        id_question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        id_questionType: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'QuestionType', 
            required: true 
        }
    }, { timestamps: true }
);

const OwnAnswer = mongoose.model('OwnAnswer', ownAnswerSchema);
export default OwnAnswer;