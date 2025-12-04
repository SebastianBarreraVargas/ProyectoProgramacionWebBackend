import { Request, Response } from "express";

export async function sendToken(req: Request, res: Response) {
    const token = null;
    res.send({ token })
}

export async function publicToken(req: Request, res: Response) {
    res.status(200).json({
        message: 'Publico'
    });
}

export async function privateToken(req: Request, res: Response) {
    try {
        res.status(200).json({
            message: 'Privado'
        })
    }catch (err) {
        res.status(400).json({
            message: 'Error al acceder',
            error: (err as Error).message
        })
    }
}