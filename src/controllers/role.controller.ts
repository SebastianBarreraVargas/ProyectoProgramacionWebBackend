import * as RoleService from "../services/role.service";
import { Request, Response } from "express";

export async function createRoleController(req: Request, res: Response) {
    try {
        const newRole = req.body;

        if (!newRole) {
            return res.status(400).json({
                success: false,
                message: 'No role data provided'
            });
        }

        const createdRole = await RoleService.createRole(newRole);

        return res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: createdRole
        });
    } catch (error) {
        console.error('Error in createRoleController:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: (error as Error).message
        });
    }
}

export async function getAllRoles(req: Request, res: Response) {
    try {
        const user_payload = req.user;
        const roles = await RoleService.get_all_roles();
        if (roles.result) {
            return res.status(200).json({
                success: true,
                message: roles.message,
                user_data: user_payload,
                data: roles.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: roles.message
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener datos de todos los roles registrados',
            error: (err as Error).message
        });
    }
}