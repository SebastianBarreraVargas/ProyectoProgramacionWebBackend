import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            unique: false 
        },
        total_points: { 
            type: Number, 
            required: true, 
            default: 0 
        },
        starts_at: { 
            type: Date, 
            required: false, 
            default: null 
        },
        ends_at: { 
            type: Date, 
            required: false, 
            default: null 
        },
        id_user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: false 
        }
    }, { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);
export default Test;