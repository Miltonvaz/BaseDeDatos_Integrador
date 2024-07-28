import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { DateUtils } from '../../shared/utils/DateUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || '';
const saltRounds = 10;
const urlProject = process.env.URL || 'http://localhost';

export class UserService {
    public static async login(email: string, password: string) {
        try {
            const user = await UserRepository.findByEmail(email);
            if (!user) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (!passwordMatch) {
                return null;
            }
    
            const payload = {
                user_id: user.user_id,
                role_id_fk: user.role_id_fk,
                first_name: user.first_name,
                email: user.email,
            };
            return jwt.sign(payload, secretKey, { expiresIn: '24h' });
        } catch (error: any) {
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    }
     
    public static async getAllUsers(): Promise<User[]> {
        try {
            return await UserRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try {
            return await UserRepository.findById(userId);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async getEmpleados(): Promise<User[]> {
        try {
            return await UserRepository.findEmpleados();
        } catch (error: any) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getAdministradores(): Promise<User[]> {
        try {
            return await UserRepository.findAdministradores();
        } catch (error: any) {
            throw new Error(`Error al obtener administradores: ${error.message}`);
        }
    }

    public static async getClientes(): Promise<User[]> {
        try {
            return await UserRepository.findClientes();
        } catch (error: any) {
            throw new Error(`Error al obtener clientes: ${error.message}`);
        }
    }

    public static async addUser(user: User, file: Express.Multer.File) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.url = `${urlProject}/uploads/${file.filename}`; 
            user.password = await bcrypt.hash(user.password, salt);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.created_by = 'Usuario que crea el registro';
            user.updated_by = 'Usuario que actualizó por última vez el registro';
    
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User) {
        try {
            const userFound = await UserRepository.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);
            if (userFound) {
                if (userData.first_name) {
                    userFound.first_name = userData.first_name;
                }
                if (userData.last_name) {
                    userFound.last_name = userData.last_name;
                }
                if (userData.email) {
                    userFound.email = userData.email;
                }
                if (userData.password) {
                    userFound.password = await bcrypt.hash(userData.password, salt);
                }
                if (userData.role_id_fk) {
                    userFound.role_id_fk = userData.role_id_fk;
                }
                if (userData.updated_by) {
                    userFound.updated_by = userData.updated_by;
                }
                if (userData.url) {
                    userFound.url = `${urlProject}/uploads/${userData.url}`.replace(/\/{2,}/g, '/');
                }
                if (userData.deleted !== undefined) {
                    userFound.deleted = userData.deleted;
                }
            } else {
                return null;
            }
            userFound.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFound);
        } catch (error: any) {
            throw new Error(`Error al modificar usuario: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try {
            return await UserRepository.deleteUser(userId);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    public static async deleteUserLogic(userId: number): Promise<boolean> {
        try {
            return await UserRepository.deleteLogic(userId);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario lógicamente: ${error.message}`);
        }
    }

    public static async userExists(identifier: string): Promise<boolean> {
        if (!isNaN(parseInt(identifier))) {
            const userId = parseInt(identifier, 10);
            const userById = await UserRepository.findById(userId);
            return !!userById; 
        } else {
            const userByEmail = await UserRepository.findByEmail(identifier);
            return !!userByEmail; 
        }
    }
}
