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
exports.RoleService = void 0;
const RoleRepository_1 = require("../repositories/RoleRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class RoleService {
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener roles: ${error.message}`);
            }
        });
    }
    static getRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.findById(roleId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el rol: ${error.message}`);
            }
        });
    }
    static addRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                role.created_at = DateUtils_1.DateUtils.formatDate(currentDate);
                role.updated_at = DateUtils_1.DateUtils.formatDate(currentDate);
                return yield RoleRepository_1.RoleRepository.createRole(role);
            }
            catch (error) {
                throw new Error(`Error al crear rol: ${error.message}`);
            }
        });
    }
    static modifyRole(roleId, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleFound = yield RoleRepository_1.RoleRepository.findById(roleId);
                if (roleFound) {
                    if (roleData.name) {
                        roleFound.name = roleData.name;
                    }
                    if (roleData.permisos) {
                        roleFound.permisos = roleData.permisos;
                    }
                    if (roleData.updated_by) {
                        roleFound.updated_by = roleData.updated_by;
                    }
                    if (roleData.deleted !== undefined) {
                        roleFound.deleted = roleData.deleted;
                    }
                    roleFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    const updatedRole = yield RoleRepository_1.RoleRepository.updateRole(roleId, roleFound);
                    return updatedRole;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar rol: ${error.message}`);
            }
        });
    }
    static deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.deleteRole(roleId);
            }
            catch (error) {
                throw new Error(`Error al eliminar rol: ${error.message}`);
            }
        });
    }
    static deleteRoleLogic(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.deleteRolLogic(userId);
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
}
exports.RoleService = RoleService;
