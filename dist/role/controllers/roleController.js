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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogicalUser = exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const roleServices_1 = require("../services/roleServices");
const getAllRoles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield roleServices_1.RoleService.getAllRoles();
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllRoles = getAllRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.role_id, 10);
        const role = yield roleServices_1.RoleService.getRoleById(roleId);
        if (role) {
            res.status(200).json(role);
        }
        else {
            res.status(404).json({ message: 'Rol no encontrado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRoleById = getRoleById;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield roleServices_1.RoleService.addRole(req.body);
        res.status(201).json(newRole);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.role_id, 10);
        const updatedRole = yield roleServices_1.RoleService.modifyRole(roleId, req.body);
        if (updatedRole) {
            res.status(200).json(updatedRole);
        }
        else {
            res.status(404).json({ message: 'Rol no encontrado o no se pudo actualizar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.role_id, 10);
        const deleted = yield roleServices_1.RoleService.deleteRole(roleId);
        if (deleted) {
            res.status(200).json({ message: 'Rol eliminado correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Rol no encontrado o no se pudo eliminar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteRole = deleteRole;
const deleteLogicalUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const success = yield roleServices_1.RoleService.deleteRoleLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully.' });
        }
        else {
            res.status(404).json({ message: 'User not found or already logically deleted.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLogicalUser = deleteLogicalUser;
