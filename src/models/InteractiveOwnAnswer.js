import mongoose from "mongoose";

const interactiveOwnAnswerSchema = new mongoose.Schema(
    {
        id_couple: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Couple', 
            required: false
        },
        id_ownAnswer: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'OwnAnswer', 
            required: true 
        },
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

const InteractiveOwnAnswer = mongoose.model('InteractiveOwnAnswer', interactiveOwnAnswerSchema);
export default InteractiveOwnAnswer;