import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as UserService from "../services/user.service";

dotenv.config();

export async function createUserController(req: Request, res: Response) {
    try {
        const newUser = req.body;
        if (!newUser) {
            return res.status(400).json({ success: false, message: 'Bad Request: No user data provided' });
        }
        const resultData = await UserService.createUser(newUser);
        if (!resultData) {
            return res.status(400).json({ success: false, message: 'Couldn\'t create user' });
        }
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: resultData
        });
    } catch (error) {
        console.error('Error in createUserController:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: (error as Error).message
        });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const { id_us } = req.query;
        if (!id_us || typeof id_us !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Id de usuario invalido',
            })
        }
        const data = await UserService.get_user_by_id(id_us);
        if (data.result) {
            return res.status(200).json({
                success: true,
                message: data.message,
                data: data.data
            });
        } else {
            return res.status(400).json({
                sucess: false,
                message: data.message
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar usuario por su id',
            error: (err as Error).message
        });
    }
}