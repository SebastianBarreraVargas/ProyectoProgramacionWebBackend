import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    age : { type: Number, required: false, default: 0 },
    handle_name : { type: String, required: false, unique: true},
    active : { type: Boolean, required: true, default: true },
    id_role : { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;