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
exports.PurchaseOrderService = void 0;
const PurchaseOrderRepository_1 = require("../repositories/PurchaseOrderRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class PurchaseOrderService {
    static getAllPurchaseOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error retrieving purchase orders: ${error.message}`);
            }
        });
    }
    static getPurchaseOrderById(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.findById(purchaseOrder_id);
            }
            catch (error) {
                throw new Error(`Error finding purchase order: ${error.message}`);
            }
        });
    }
    static addPurchaseOrder(purchaseOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                purchaseOrder.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                purchaseOrder.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.createPurchaseOrder(purchaseOrder);
            }
            catch (error) {
                throw new Error(`Error creating purchase order: ${error.message}`);
            }
        });
    }
    static updatePurchaseOrder(purchaseOrder_id, purchaseOrderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseOrderFound = yield PurchaseOrderRepository_1.PurchaseOrderRepository.findById(purchaseOrder_id);
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
                purchaseOrderFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                if (purchaseOrderData.deleted !== undefined) {
                    purchaseOrderFound.deleted = purchaseOrderData.deleted;
                }
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.updatePurchaseOrder(purchaseOrder_id, purchaseOrderFound);
            }
            catch (error) {
                throw new Error(`Error modifying purchase order: ${error.message}`);
            }
        });
    }
    static deletePurchaseOrder(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.deletePurchaseOrder(purchaseOrder_id);
            }
            catch (error) {
                throw new Error(`Error deleting purchase order: ${error.message}`);
            }
        });
    }
    static deleteLogicalPurchaseOrder(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PurchaseOrderRepository_1.PurchaseOrderRepository.deletePurchaseOrderLogic(purchaseOrder_id);
            }
            catch (error) {
                throw new Error(`Error logically deleting purchase order: ${error.message}`);
            }
        });
    }
}
exports.PurchaseOrderService = PurchaseOrderService;
