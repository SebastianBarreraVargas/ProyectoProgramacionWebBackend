import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        statement: { 
            type: String, 
            required: true 
        },
        score: { 
            type: Number, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ['draft', 'editing', 'published'],
            default: 'draft',
            required: true 
        },
        id_question_type: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'QuestionType', 
            required: true,
            unique: true
        },
        difficulty: { 
            type: String, 
            enum: ['low', 'medium', 'high'],
            required: false
        }
    }, 
    { timestamps: true }
);

QuestionSchema.index({ id_question_type: 1 }, { unique: true });

const Question = mongoose.model('Question', QuestionSchema);
export default Question;