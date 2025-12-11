import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
    {
        materia_name: { 
            type: String, 
            required: true 
        },
        materia_description: { 
            type: String, 
            required: false 
        },
        materia_acronym: { 
            type: String, 
            maxlength: 5,
            required: false 
        }
    }, 
    { timestamps: true }
);

const Subject = mongoose.model('Subject', SubjectSchema);
export default Subject;