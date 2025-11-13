import * as dotenv from 'dotenv';
import 'express';
import { createUser } from "./user.service.js";

dotenv.config();

export async function createUserController(req, res) {
    try {
        const newUser = req.body;
        if (!newUser){
            return res.status(400).json({ success: false, message: 'Bad Request: No user data provided' });
        }
        const resultData =  await createUser(newUser);
        if (!resultData) {
            return res.status(400).json({ success: false, message: 'Couldn\'t create user' });
        }
        return res.status(200).json({ success: true, message: 'User created successfully', data: resultData });
    } catch (error) {
        console.error('Error in createUserController:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
