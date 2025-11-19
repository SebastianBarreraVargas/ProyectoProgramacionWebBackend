import mongoose from "mongoose";

const answerAgeClassificationSchema = new mongoose.Schema(
    {
        id_answer: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Answer', 
            required: true 
        },
        id_age_classification: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'AgeClassification', 
            required: true 
        }
    }, { timestamps: true }
);

const AnswerAgeClassification = mongoose.model('AnswerAgeClassification', answerAgeClassificationSchema);
export default AnswerAgeClassification;