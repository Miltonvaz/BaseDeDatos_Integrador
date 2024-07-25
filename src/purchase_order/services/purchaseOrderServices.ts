import { PurchaseOrderRepository } from "../repositories/PurchaseOrderRepository";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { DateUtils } from "../../shared/utils/DateUtils";


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

        
            if (purchaseOrderData.date !== undefined) {
                purchaseOrderFound.date = purchaseOrderData.date;
            }
            if (purchaseOrderData.total !== undefined) {
                purchaseOrderFound.total = purchaseOrderData.total;
            }
            if (purchaseOrderData.user_id_fk !== undefined) {
                purchaseOrderFound.user_id_fk = purchaseOrderData.user_id_fk;
            }
            if (purchaseOrderData.street !== undefined) {
                purchaseOrderFound.street = purchaseOrderData.street;
            }
            if (purchaseOrderData.city !== undefined) {
                purchaseOrderFound.city = purchaseOrderData.city;
            }
            if (purchaseOrderData.status_id_fk !== undefined) {
                purchaseOrderFound.status_id_fk = purchaseOrderData.status_id_fk;
            }
            if (purchaseOrderData.updated_by !== undefined) {
                purchaseOrderFound.updated_by = purchaseOrderData.updated_by;
            }
            purchaseOrderFound.updated_at = DateUtils.formatDate(new Date());
            if (purchaseOrderData.deleted !== undefined) {
                purchaseOrderFound.deleted = purchaseOrderData.deleted;
            }

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
}
