import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        statement: { 
            type: String, 
            required: true, 
            unique: false 
        },
        points: { 
            type: Number, 
            required: false, 
            default: 0 
        },
        state: { 
            type: Boolean, 
            required: false, 
            default: true 
        },
        difficulty: { 
            type: String, 
            enum: ["easy", "medium", "hard"],
            default: "medium"
        },
        id_question_type: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question_Type', 
            required: true 
        }
    }, { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;