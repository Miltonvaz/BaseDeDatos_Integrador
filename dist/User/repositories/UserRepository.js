"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class UserRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE deleted = 0';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 2';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findAdministradores() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 1';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findClientes() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE deleted = 0 AND role_id_fk = 3';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE user_id = ? AND deleted = 0';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [user_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        if (users.length > 0) {
                            resolve(users[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user WHERE email = ? AND deleted = 0';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [email], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        if (users.length > 0) {
                            resolve(users[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted } = user;
            const query = `INSERT INTO user (first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [first_name, last_name, email, password, role_id_fk, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0, user.url];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createUserId = result.insertId;
                        const createdUser = Object.assign(Object.assign({}, user), { user_id: createUserId });
                        resolve(createdUser);
                    }
                });
            });
        });
    }
    static updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, password, role_id_fk, updated_at, updated_by, deleted } = userData;
            const query = `UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ?, role_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ?, url = ? WHERE user_id = ?`;
            const values = [first_name, last_name, email, password, role_id_fk, updated_at, updated_by, deleted ? 1 : 0, userData.url, userId];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(userData);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM user WHERE user_id = ?`;
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [userId], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
    static deleteLogic(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE user SET deleted = 1 WHERE user_id = ?`;
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [userId], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
