import dotenv from 'dotenv';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service'

dotenv.config();

const secret = process.env.SECRET;

if (!secret) {
    throw new Error('SECRET no está definido en las variables de entorno');
}

export async function sendToken(req: Request, res: Response) {
    const { id_us, username } = req.query;
    if (!id_us || typeof id_us !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Id de usuario invalido'
        });
    }
    if (!username || typeof username !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Nombre de usuario invalido'
        });
    }
    const { result } = await UserService.get_user_by_id(id_us);
    if (!result) {
        return res.status(400).json({
            success: false,
            message: 'El usuario solicitado no existe'
        })
    }
    const token = jwt.sign({
        id_us,
        username,
    }, secret as string, { expiresIn: '15m' });
    return res.status(200).json({
        success: true,
        message: 'Token generado correctamente',
        token: token
    });
}

export async function publicToken(req: Request, res: Response) {
    res.status(200).json({
        message: 'Publico'
    });
}

export async function privateToken(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.query.token;
        if (!token || typeof token !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Error, token no proporcionado'
            })
        }
        const payload = jwt.verify(token, secret as string) as {
            id_us: string;
            usename: string
        };
        return res.status(200).json({
            success: true,
            message: 'Datos privados accesados correctamente a traves del token valido',
            data: payload
        })
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(400).json({
                success: false,
                message: 'Token expirado',
                expiredAt: err.expiredAt,
                error: err.message
            });
        }
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({
                success: false,
                message: 'Token invalido',
                error: (err as Error).message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error al acceder a los datos a traves del token',
            error: (err as Error).message
        })
    }
}