"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseOrderController_1 = require("../controllers/purchaseOrderController");
const auth_1 = require("../../shared/middlewares/auth");
const auth_2 = require("../../shared/middlewares/auth");
const purchaseOrderRoutes = (0, express_1.Router)();
purchaseOrderRoutes.put('/deleted/:purchaseOrder_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), purchaseOrderController_1.deletePurchaseOrderLogic);
purchaseOrderRoutes.get('/', auth_1.authMiddleware, purchaseOrderController_1.getAllPurchaseOrders);
purchaseOrderRoutes.get('/:purchaseOrder_id', auth_1.authMiddleware, purchaseOrderController_1.getPurchaseOrderById);
purchaseOrderRoutes.post('/', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado', 'Usuario']), purchaseOrderController_1.createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), purchaseOrderController_1.updatePurchaseOrder);
purchaseOrderRoutes.delete('/:purchaseOrder_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), purchaseOrderController_1.deletePurchaseOrder);
exports.default = purchaseOrderRoutes;
