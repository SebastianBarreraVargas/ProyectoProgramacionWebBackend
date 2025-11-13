import * as dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

export async function createUser(userData) {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return { result: true, message_state: 'User created successfully' };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}