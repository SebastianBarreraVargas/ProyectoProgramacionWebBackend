import mongoose from "mongoose";

const ageClassificationSchema = new mongoose.Schema(
    {
        desc_classification: { 
            type: String, 
            required: true
        },
        starting_age: { 
            type: Number, 
            required: true
        },
        ending_age: { 
            type: Number, 
            required: true
        }
    }, { timestamps: true }
);

const AgeClassification = mongoose.model('AgeClassification', ageClassificationSchema);
export default AgeClassification;