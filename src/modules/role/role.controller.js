import { createRole } from "./role.service.js";

export async function createRoleController(req, res) {
    try {
        const newRole = req.body;

        if (!newRole) {
            return res.status(400).json({
                success: false,
                message: 'No role data provided'
            });
        }

        const createdRole = await createRole(newRole);

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
            error: error.message
        });
    }
}
