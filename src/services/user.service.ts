import mongoose from 'mongoose';
import User from '../models/User';

interface UserParameter {
    username: string;
    email: string; 
    age: number;
    handle_name: string;       
    active: boolean;
    id_role: mongoose.Schema.Types.ObjectId
}

export async function createUser(userData: UserParameter) {
   try {
       const newUser = new User(userData);
       await newUser.save();
       return { result: true, message_state: 'User created successfully' };
   } catch (error) {
       throw new Error('Error creating user: ' + (error as Error).message);
   }
}

export async function get_user_by_id(id_us: string) {
    try {
        const exists = await User.findById({
            _id: id_us
        });
        if (exists) {
            return {
                result: true,
                message: 'Usuario con id solicitado encontrado exitosamente',
                data: exists
            }
        } else {
            return {
                result: false,
                message: 'No se pudo encontrar el usuario con el id solicitado'
            }
        }
    } catch (err) {
        throw new Error('Error al encontrar el usuario: ' + (err as Error).message);
    }
}