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
exports.deleteLogicalStatus = exports.deleteStatus = exports.updateStatus = exports.createStatus = exports.getStatusById = exports.getAllStatuses = void 0;
const statusService_1 = require("../service/statusService");
const getAllStatuses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statuses = yield statusService_1.StatusService.getAllStatuses();
        res.status(200).json(statuses);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllStatuses = getAllStatuses;
const getStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const status = yield statusService_1.StatusService.getStatusById(statusId);
        if (status) {
            res.status(200).json(status);
        }
        else {
            res.status(404).json({ message: 'Estado no encontrado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getStatusById = getStatusById;
const createStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStatus = yield statusService_1.StatusService.addStatus(req.body);
        res.status(201).json(newStatus);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createStatus = createStatus;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const updatedStatus = yield statusService_1.StatusService.modifyStatus(statusId, req.body);
        if (updatedStatus) {
            res.status(200).json(updatedStatus);
        }
        else {
            res.status(404).json({ message: 'Estado no encontrado o no se pudo actualizar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateStatus = updateStatus;
const deleteStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const deleted = yield statusService_1.StatusService.deleteStatus(statusId);
        if (deleted) {
            res.status(200).json({ message: 'Estado eliminado correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Estado no encontrado o no se pudo eliminar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteStatus = deleteStatus;
const deleteLogicalStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const success = yield statusService_1.StatusService.deleteStatusLogic(statusId);
        if (success) {
            res.status(200).json({ message: 'Estado eliminado lógicamente correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Estado no encontrado o ya eliminado lógicamente.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLogicalStatus = deleteLogicalStatus;
