import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { PurchaseOrder } from "../models/PurchaseOrder";

export class PurchaseOrderRepository {

    public static async findAll(): Promise<PurchaseOrder[]> {
        const query = "SELECT * FROM purchaseorder";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const purchaseOrders: PurchaseOrder[] = results as PurchaseOrder[];
                    resolve(purchaseOrders);
                }
            });
        });
    }

    public static async findById(purchaseOrder_id: number): Promise<PurchaseOrder | null> {
        const query = "SELECT * FROM purchaseorder WHERE purchaseOrder_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrder_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const purchaseOrders: PurchaseOrder[] = results as PurchaseOrder[];
                    if (purchaseOrders.length > 0) {
                        resolve(purchaseOrders[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
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
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(query, values, (error, result) => {
                    if (error) {
                        connection.rollback(() => {
                            reject(error);
                        });
                    } else {
                        const createdPurchaseOrderId = (result as ResultSetHeader).insertId;
                        const createdPurchaseOrder: PurchaseOrder = { ...purchaseOrder, purchaseOrder_id: createdPurchaseOrderId };

                        // Insertar en la tabla pivote product_purchaseorder
                        const pivotQuery = 'INSERT INTO product_purchaseorder (product_id, purchaseorder_id, cantidad) VALUES (?, ?, ?)';
                        const pivotValues = [
                            purchaseOrder.product_id_fk,
                            createdPurchaseOrderId,
                            purchaseOrder.cantidad
                        ];

                        connection.query(pivotQuery, pivotValues, (pivotError, _pivotResult) => {
                            if (pivotError) {
                                connection.rollback(() => {
                                    reject(pivotError);
                                });
                            } else {
                                connection.commit((commitError) => {
                                    if (commitError) {
                                        connection.rollback(() => {
                                            reject(commitError);
                                        });
                                    } else {
                                        resolve(createdPurchaseOrder);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    }

    public static async updatePurchaseOrder(purchaseOrder_id: number, purchaseOrderData: PurchaseOrder): Promise<PurchaseOrder | null> {
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
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        const updatedPurchaseOrder: PurchaseOrder = { ...purchaseOrderData, purchaseOrder_id: purchaseOrder_id };
                        resolve(updatedPurchaseOrder);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deletePurchaseOrder(purchaseOrder_id: number): Promise<boolean> {
        const query = 'DELETE FROM purchaseorder WHERE purchaseOrder_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrder_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deletePurchaseOrderLogic(purchaseOrder_id: number): Promise<boolean> {
        const query = 'UPDATE purchaseorder SET deleted = 1 WHERE purchaseOrder_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrder_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
