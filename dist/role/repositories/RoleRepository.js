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
exports.RoleRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class RoleRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM role WHERE deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const roles = results;
                        resolve(roles);
                    }
                });
            });
        });
    }
    static findById(role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM role WHERE role_id = ? AND deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [role_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const roles = results;
                        if (roles.length > 0) {
                            resolve(roles[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM role WHERE name = ? AND deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [name], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const roles = results;
                        if (roles.length > 0) {
                            resolve(roles[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO role (name, permisos, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [role.name, role.permisos, role.created_at, role.created_by, role.updated_at, role.updated_by, role.deleted ? 1 : 0], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdRoleId = result.insertId;
                        const createdRole = Object.assign(Object.assign({}, role), { role_id: createdRoleId });
                        resolve(createdRole);
                    }
                });
            });
        });
    }
    static updateRole(role_id, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, permisos, updated_at, updated_by, deleted } = roleData;
            const query = `UPDATE role SET name = ?, permisos = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE role_id = ?`;
            const values = [name, permisos, updated_at, updated_by, deleted ? 1 : 0, role_id];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedRole = Object.assign(Object.assign({}, roleData), { role_id: role_id });
                            resolve(updatedRole);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteRole(role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM role WHERE role_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [role_id], (error, result) => {
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
    static deleteRolLogic(role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE role SET deleted = 1 WHERE role_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [role_id], (error, result) => {
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
exports.RoleRepository = RoleRepository;
