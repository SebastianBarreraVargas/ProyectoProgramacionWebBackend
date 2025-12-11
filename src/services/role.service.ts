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

export async function get_all_roles() {
    try {
        const roles = await Role.find();
        if (roles) {
            return {
                result: true,
                message: 'Datos de todos los roles registrados exitosamente',
                data: roles
            }
        } else {
            return {
                result: false,
                message: 'No existen roles registrados'
            }
        }
    } catch (err) {
        throw new Error('Error al obtener los datos de todos los roles: ' + (err as Error).message);
    }
}