import mongoose from "mongoose";

const optionAnswerSchema = new mongoose.Schema(
    {
        id_question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        id_answer: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Answer', 
            required: true 
        },
        id_question_type: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'QuestionType', 
            required: true 
        },
        id_option: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Option', 
            required: true 
        }

    }, { timestamps: true }
);

const OptionAnswer = mongoose.model('OptionAnswer', optionAnswerSchema);
export default OptionAnswer;