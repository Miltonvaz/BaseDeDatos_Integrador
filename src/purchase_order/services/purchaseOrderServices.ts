import { PurchaseOrderRepository } from "../repositories/PurchaseOrderRepository";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { DateUtils } from "../../shared/utils/DateUtils";
import { Request, Response } from 'express';

export class PurchaseOrderService {
    public static async getAllPurchaseOrders(): Promise<PurchaseOrder[]> {
        try {
            return await PurchaseOrderRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error retrieving purchase orders: ${error.message}`);
        }
    }

    public static async getPurchaseOrderById(purchaseOrder_id: number): Promise<PurchaseOrder | null> {
        try {
            return await PurchaseOrderRepository.findById(purchaseOrder_id);
        } catch (error: any) {
            throw new Error(`Error finding purchase order: ${error.message}`);
        }
    }

    public static async addPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
        try {
            purchaseOrder.created_at = DateUtils.formatDate(new Date());
            purchaseOrder.updated_at = DateUtils.formatDate(new Date());
            return await PurchaseOrderRepository.createPurchaseOrder(purchaseOrder);
        } catch (error: any) {
            throw new Error(`Error creating purchase order: ${error.message}`);
        }
    }

    public static async updatePurchaseOrder(purchaseOrder_id: number, purchaseOrderData: Partial<PurchaseOrder>): Promise<PurchaseOrder | null> {
        try {
            const purchaseOrderFound = await PurchaseOrderRepository.findById(purchaseOrder_id);

            if (!purchaseOrderFound) {
                throw new Error(`Purchase order with ID ${purchaseOrder_id} not found.`);
            }
            Object.assign(purchaseOrderFound, purchaseOrderData);
            purchaseOrderFound.updated_at = DateUtils.formatDate(new Date());

            return await PurchaseOrderRepository.updatePurchaseOrder(purchaseOrder_id, purchaseOrderFound);
        } catch (error: any) {
            throw new Error(`Error modifying purchase order: ${error.message}`);
        }
    }

    public static async deletePurchaseOrder(purchaseOrder_id: number): Promise<boolean> {
        try {
            return await PurchaseOrderRepository.deletePurchaseOrder(purchaseOrder_id);
        } catch (error: any) {
            throw new Error(`Error deleting purchase order: ${error.message}`);
        }
    }

    public static async deleteLogicalPurchaseOrder(purchaseOrder_id: number): Promise<boolean> {
        try {
            return await PurchaseOrderRepository.deletePurchaseOrderLogic(purchaseOrder_id);
        } catch (error: any) {
            throw new Error(`Error logically deleting purchase order: ${error.message}`);
        }
    }

    public static async handlePayPalWebhook(req: Request, res: Response): Promise<Response> {
        try {
            const webhookEvent = req.body;

            if (webhookEvent.event_type === 'PAYMENT.SALE.COMPLETED') {
                const { sale_id, transaction_id } = webhookEvent.resource;
                const receipt = `PayPal Receipt - Sale ID: ${sale_id}, Transaction ID: ${transaction_id}`;
                await PurchaseOrderService.updatePurchaseOrderByReceipt(receipt, sale_id);
            }

            return res.status(200).json({ message: 'Webhook received and processed' });
        } catch (error: any) {
            return res.status(500).json({ message: `Error handling PayPal webhook: ${error.message}` });
        }   
    }

    public static async updatePurchaseOrderByReceipt(receipt: string, sale_id: string): Promise<PurchaseOrder | null> {
        try {
            const purchaseOrder = await PurchaseOrderRepository.findBySaleId(sale_id);
            if (!purchaseOrder) {
                throw new Error(`Purchase order with Sale ID ${sale_id} not found.`);
            }
            
            if (purchaseOrder.purchaseOrder_id === null) {
                throw new Error('Purchase order ID is null.');
            }
    
            purchaseOrder.receipt = receipt;
            purchaseOrder.updated_at = DateUtils.formatDate(new Date());
            return await PurchaseOrderRepository.updatePurchaseOrder(purchaseOrder.purchaseOrder_id, purchaseOrder);
        } catch (error: any) {
            throw new Error(`Error updating purchase order by receipt: ${error.message}`);
        }
    }
    
}