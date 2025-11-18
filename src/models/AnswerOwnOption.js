import mongoose from "mongoose";

const answerOwnOptionSchema = new mongoose.Schema(
    {
        id_user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        id_Question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        id_QuestionType: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'QuestionType', 
            required: true 
        },
        id_OwnAnswer: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'OwnAnswer', 
            required: true 
        },
        id_Option: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Option', 
            required: false
        }
    }, { timestamps: true }
);

const AnswerOwnOption = mongoose.model('AnswerOwnOption', answerOwnOptionSchema);
export default AnswerOwnOption;