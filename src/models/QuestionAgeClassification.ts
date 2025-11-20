import mongoose from "mongoose";

const QuestionAgeClassificationSchema = new mongoose.Schema(
    {
        id_question: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        },
        id_age_classification: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'AgeClassification', 
            required: true 
        }
    }, { timestamps: true }
);

const QuestionAgeClassification = mongoose.model('QuestionAgeClassification', QuestionAgeClassificationSchema);
export default QuestionAgeClassification;