import Role from '../models/Role';

interface RoleParameter {
    role_name: string;
    role_description: string;
}

export async function createRole(roleData: RoleParameter) {
    try {
        const newRole = new Role(roleData);
        const savedRole = await newRole.save();
        return savedRole;
    } catch (error) {
        throw new Error('Error creating role: ' + (error as Error).message);
    }
}