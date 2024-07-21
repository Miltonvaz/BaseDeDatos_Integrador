import { Router } from "express";
import { getAllPurchaseOrders, getPurchaseOrderById,createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, deletePurchaseOrderLogic } from "../controllers/purchaseOrderController";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authorizeRole } from "../../shared/middlewares/auth";

const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.put('/deleted/:purchaseOrder_id', authorizeRole(['Administrador','Empleado']),authMiddleware, deletePurchaseOrderLogic); 
purchaseOrderRoutes.get('/', authMiddleware, getAllPurchaseOrders); 
purchaseOrderRoutes.get('/:purchaseOrder_id', authMiddleware, getPurchaseOrderById);
purchaseOrderRoutes.post('/', authorizeRole(['Administrador','Empleado']),authMiddleware, createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', authorizeRole(['Administrador','Empleado']),authMiddleware, updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id', authorizeRole(['Administrador','Empleado']),authMiddleware, deletePurchaseOrder); 

export default purchaseOrderRoutes;
