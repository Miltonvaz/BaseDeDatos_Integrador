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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class PurchaseOrderRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM purchaseorder";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const purchaseOrders = results;
                        resolve(purchaseOrders);
                    }
                });
            });
        });
    }
    static findById(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM purchaseorder WHERE purchaseOrder_id = ?";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [purchaseOrder_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const purchaseOrders = results;
                        if (purchaseOrders.length > 0) {
                            resolve(purchaseOrders[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createPurchaseOrder(purchaseOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO purchaseorder (date, total, product_id_fk, user_id_fk, street, city, status_id_fk, cantidad, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                purchaseOrder.date,
                purchaseOrder.total,
                purchaseOrder.product_id_fk,
                purchaseOrder.user_id_fk,
                purchaseOrder.street,
                purchaseOrder.city,
                purchaseOrder.status_id_fk,
                purchaseOrder.cantidad,
                purchaseOrder.created_at,
                purchaseOrder.created_by,
                purchaseOrder.updated_at,
                purchaseOrder.updated_by,
                purchaseOrder.deleted ? 1 : 0
            ];
            return new Promise((resolve, reject) => {
                database_1.default.beginTransaction((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    database_1.default.query(query, values, (error, result) => {
                        if (error) {
                            database_1.default.rollback(() => {
                                reject(error);
                            });
                        }
                        else {
                            const createdPurchaseOrderId = result.insertId;
                            const createdPurchaseOrder = Object.assign(Object.assign({}, purchaseOrder), { purchaseOrder_id: createdPurchaseOrderId });
                            // Insertar en la tabla pivote product_purchaseorder
                            const pivotQuery = 'INSERT INTO product_purchaseorder (product_id, purchaseorder_id, cantidad) VALUES (?, ?, ?)';
                            const pivotValues = [
                                purchaseOrder.product_id_fk,
                                createdPurchaseOrderId,
                                purchaseOrder.cantidad
                            ];
                            database_1.default.query(pivotQuery, pivotValues, (pivotError, _pivotResult) => {
                                if (pivotError) {
                                    database_1.default.rollback(() => {
                                        reject(pivotError);
                                    });
                                }
                                else {
                                    database_1.default.commit((commitError) => {
                                        if (commitError) {
                                            database_1.default.rollback(() => {
                                                reject(commitError);
                                            });
                                        }
                                        else {
                                            resolve(createdPurchaseOrder);
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    }
    static updatePurchaseOrder(purchaseOrder_id, purchaseOrderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE purchaseorder SET date = ?, total = ?, product_id_fk = ?, user_id_fk = ?, street = ?, city = ?, status_id_fk = ?, updated_at = ?, updated_by = ?, cantidad = ?, deleted = ? WHERE purchaseOrder_id = ?`;
            const values = [
                purchaseOrderData.date,
                purchaseOrderData.total,
                purchaseOrderData.product_id_fk,
                purchaseOrderData.user_id_fk,
                purchaseOrderData.street,
                purchaseOrderData.city,
                purchaseOrderData.status_id_fk,
                purchaseOrderData.updated_at,
                purchaseOrderData.updated_by,
                purchaseOrderData.cantidad,
                purchaseOrderData.deleted ? 1 : 0,
                purchaseOrder_id
            ];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedPurchaseOrder = Object.assign(Object.assign({}, purchaseOrderData), { purchaseOrder_id: purchaseOrder_id });
                            resolve(updatedPurchaseOrder);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deletePurchaseOrder(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM purchaseorder WHERE purchaseOrder_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [purchaseOrder_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
    static deletePurchaseOrderLogic(purchaseOrder_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE purchaseorder SET deleted = 1 WHERE purchaseOrder_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [purchaseOrder_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.PurchaseOrderRepository = PurchaseOrderRepository;
