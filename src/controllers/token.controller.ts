import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service'
import mongoose from 'mongoose';

dotenv.config();

const secret = process.env.SECRET;

if (!secret) {
    throw new Error('SECRET no está definido en las variables de entorno');
}

interface UserPayload {
    id_us: string;
    username: string;
    role?: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload;
    }
}
export async function sendToken(req: Request, res: Response) {
    const { id_us, username, role } = req.query;
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
        role
    }, secret as string, { expiresIn: '15m' });
    return res.status(200).json({
        success: true,
        message: 'Token generado correctamente',
        token: token
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
            username: string;
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

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Error, token no proporcionado'
        });
    }
    jwt.verify(token, secret as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado al servicio, autenticacion fallida por token expirado o incorrecto'
            });
        } else {
            req.user = user as UserPayload;
            next();
        }
    });
}

export async function verifyTokenTeacher(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Error, token no proporcionado'
        });
    }
    const payload = jwt.verify(token, secret as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado al servicio, autenticacion fallida por token expirado o incorrecto'
            });
        } else {
            req.user = user as UserPayload;
            next();
        }
        if (req.user.role?.toString() !== '693170ff90f140f63829c7d3') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado al servicio, el usuario no tiene privilegios de administrador'
            });
        }
    });
}

export async function verifyTokenStudent(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Error, token no proporcionado'
        });
    }
    const payload = jwt.verify(token, secret as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado al servicio, autenticacion fallida por token expirado o incorrecto'
            });
        } else {
            req.user = user as UserPayload;
            next();
        }
        if (req.user.role?.toString() !== '691bdd83122def7416037e23') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado al servicio, el usuario no tiene privilegios de administrador'
            });
        }
    });
}

export async function verifyTokenAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Error, token no proporcionado'
        });
    }
    const payload = jwt.verify(token, secret as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado al servicio, autenticacion fallida por token expirado o incorrecto'
            });
        } else {
            req.user = user as UserPayload;
            next();
        }
        if (req.user.role?.toString() !== '693a93bb5aaeea906e3597f5') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado al servicio, el usuario no tiene privilegios de administrador'
            });
        }
    });
}