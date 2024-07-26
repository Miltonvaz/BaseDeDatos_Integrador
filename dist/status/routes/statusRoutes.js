"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/statusRoutes.ts
const express_1 = require("express");
const statusController_1 = require("../controllers/statusController");
const statusRoutes = (0, express_1.Router)();
statusRoutes.get('/', statusController_1.getAllStatuses);
statusRoutes.get('/:status_id', statusController_1.getStatusById);
statusRoutes.post('/', statusController_1.createStatus);
statusRoutes.put('/:status_id', statusController_1.updateStatus);
statusRoutes.delete('/:status_id', statusController_1.deleteStatus);
statusRoutes.put('/deleted/:status_id', statusController_1.deleteLogicalStatus);
exports.default = statusRoutes;
