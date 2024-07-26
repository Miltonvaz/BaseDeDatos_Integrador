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
exports.StatusService = void 0;
const StatusRepository_1 = require("../repository/StatusRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class StatusService {
    static getAllStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StatusRepository_1.StatusRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener estados: ${error.message}`);
            }
        });
    }
    static getStatusById(statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StatusRepository_1.StatusRepository.findById(statusId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el estado: ${error.message}`);
            }
        });
    }
    static addStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                status.created_at = DateUtils_1.DateUtils.formatDate(currentDate);
                status.updated_at = DateUtils_1.DateUtils.formatDate(currentDate);
                return yield StatusRepository_1.StatusRepository.createStatus(status);
            }
            catch (error) {
                throw new Error(`Error al crear estado: ${error.message}`);
            }
        });
    }
    static modifyStatus(statusId, statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statusFound = yield StatusRepository_1.StatusRepository.findById(statusId);
                if (statusFound) {
                    if (statusData.name) {
                        statusFound.name = statusData.name;
                    }
                    if (statusData.updated_by) {
                        statusFound.updated_by = statusData.updated_by;
                    }
                    if (statusData.deleted !== undefined) {
                        statusFound.deleted = statusData.deleted;
                    }
                    statusFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    const updatedStatus = yield StatusRepository_1.StatusRepository.updateStatus(statusId, statusFound);
                    return updatedStatus;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar estado: ${error.message}`);
            }
        });
    }
    static deleteStatus(statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StatusRepository_1.StatusRepository.deleteStatus(statusId);
            }
            catch (error) {
                throw new Error(`Error al eliminar estado: ${error.message}`);
            }
        });
    }
    static deleteStatusLogic(statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StatusRepository_1.StatusRepository.deleteStatusLogic(statusId);
            }
            catch (error) {
                throw new Error(`Error al eliminar estado lógicamente: ${error.message}`);
            }
        });
    }
}
exports.StatusService = StatusService;
