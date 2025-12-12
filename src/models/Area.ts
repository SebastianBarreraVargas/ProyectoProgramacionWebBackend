import mongoose from "mongoose";

const AreaSchema = new mongoose.Schema(
    {
        area_name: {
            type: String,
            required: true
        },
        area_description: {
            type: String,
            required: false
        },
        acronym: {
            type: String,
            maxlength: 5,
            required: false
        },
        id_subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true
        }
    },
    {
        timestamps: true
    }
);

AreaSchema.index({ id_materia: 1 }, { unique: true });

const Area = mongoose.model('Area', AreaSchema);

export default Area;