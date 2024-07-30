import { Router } from "express";
import { getAllPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, deletePurchaseOrderLogic } from "../controllers/purchaseOrderController";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authorizeRole } from "../../shared/middlewares/auth";

const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.put('/deleted/:purchaseOrder_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), deletePurchaseOrderLogic); 
purchaseOrderRoutes.get('/', authMiddleware, getAllPurchaseOrders); 
purchaseOrderRoutes.get('/:purchaseOrder_id', authMiddleware, getPurchaseOrderById);
purchaseOrderRoutes.post('/',createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), deletePurchaseOrder); 

export default purchaseOrderRoutes;
