import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {
    public static async findAll(): Promise<User[]> {
        const query = 'SELECT * FROM user WHERE deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findEmpleados(): Promise<User[]> {
        const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 2';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findAdministradores(): Promise<User[]> {
        const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 1';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findClientes(): Promise<User[]> {
        const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 3';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findById(user_id: number): Promise<User | null> {
        const query = 'SELECT * FROM user WHERE user_id = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    

    public static async findByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM user WHERE email = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async createUser(user: User): Promise<User> {
        const { first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted } = user;
        const query = `INSERT INTO user (first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0, user.url];
    
        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createUserId = (result as any).insertId;
                    const createdUser: User = { ...user, user_id: createUserId };
                    resolve(createdUser);
                }
            });
        });
    }
    
    public static async updateUser(userId: number, userData: User): Promise<User | null> {
        const { first_name, last_name, email, password, role_id_fk, updated_at, updated_by, deleted } = userData;
        const query = `UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ?, role_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ?, url = ? WHERE user_id = ?`;
        const values = [first_name, last_name, email, password, role_id_fk, updated_at, updated_by, deleted ? 1 : 0, userData.url, userId];
    
        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(userData);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    

    public static async deleteUser(userId: number): Promise<boolean> {
        const query = `DELETE FROM user WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [userId], (error, result) => {
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

    public static async deleteLogic(userId: number): Promise<boolean> {
        const query = `UPDATE user SET deleted = 1 WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [userId], (error, result) => {
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
