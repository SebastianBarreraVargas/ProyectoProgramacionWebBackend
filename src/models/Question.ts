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