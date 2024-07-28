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
exports.StatusRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class StatusRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM status WHERE deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const statuses = results;
                        resolve(statuses);
                    }
                });
            });
        });
    }
    static findById(status_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM status WHERE status_id = ? AND deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [status_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const statuses = results;
                        if (statuses.length > 0) {
                            resolve(statuses[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM status WHERE name = ? AND deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [name], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const statuses = results;
                        if (statuses.length > 0) {
                            resolve(statuses[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO status (name, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [status.name, status.created_at, status.created_by, status.updated_at, status.updated_by, status.deleted ? 1 : 0], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdStatusId = result.insertId;
                        const createdStatus = Object.assign(Object.assign({}, status), { status_id: createdStatusId });
                        resolve(createdStatus);
                    }
                });
            });
        });
    }
    static updateStatus(status_id, statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, updated_at, updated_by, deleted } = statusData;
            const query = `UPDATE status SET name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE status_id = ?`;
            const values = [name, updated_at, updated_by, deleted ? 1 : 0, status_id];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedStatus = Object.assign(Object.assign({}, statusData), { status_id: status_id });
                            resolve(updatedStatus);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteStatus(status_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM status WHERE status_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [status_id], (error, result) => {
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
    static deleteStatusLogic(status_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE status SET deleted = 1 WHERE status_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [status_id], (error, result) => {
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
exports.StatusRepository = StatusRepository;
