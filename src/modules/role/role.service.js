import Role from '../../models/Role.js';

export async function createRole(roleData) {
    try {
        const newRole = new Role(roleData);
        const savedRole = await newRole.save();
        return savedRole;
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
}
