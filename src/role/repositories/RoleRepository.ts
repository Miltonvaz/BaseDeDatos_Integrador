import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Role } from "../models/Role";

export class RoleRepository {

    public static async findAll(): Promise<Role[]> {
        const query = "SELECT * FROM role WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    resolve(roles);
                }
            });
        });
    }

    public static async findById(role_id: number): Promise<Role | null> {
        const query = "SELECT * FROM role WHERE role_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [role_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    if (roles.length > 0) {
                        resolve(roles[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByRole(name: string): Promise<Role | null> {
        const query = "SELECT * FROM role WHERE name = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [name], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    if (roles.length > 0) {
                        resolve(roles[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createRole(role: Role): Promise<Role> {
        const query = `INSERT INTO role (name, permisos, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(query, [role.name, role.permisos, role.created_at, role.created_by, role.updated_at, role.updated_by, role.deleted ? 1 : 0], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdRoleId = (result as ResultSetHeader).insertId;
                    const createdRole: Role = { ...role, role_id: createdRoleId };
                    resolve(createdRole);
                }
            });
        });
    }

    public static async updateRole(role_id: number, roleData: Role): Promise<Role | null> {
        const { name, permisos, updated_at, updated_by, deleted } = roleData;
        const query = `UPDATE role SET name = ?, permisos = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE role_id = ?`;
        const values = [name, permisos, updated_at, updated_by, deleted ? 1 : 0, role_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        const updatedRole: Role = { ...roleData, role_id: role_id };
                        resolve(updatedRole);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteRole(role_id: number): Promise<boolean> {
        const query = 'DELETE FROM role WHERE role_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [role_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deleteRolLogic(role_id: number): Promise<boolean> {
        const query = 'UPDATE role SET deleted = 1 WHERE role_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [role_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
