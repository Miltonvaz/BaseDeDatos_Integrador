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
   
    
    public static async getMostSoldProducts(): Promise<{ product_id: number, name: string, total_sold: number }[]> {
        const query = `
            SELECT p.product_id, p.name, SUM(po.cantidad) AS total_sold
            FROM product p
            JOIN purchaseorder po ON p.product_id = po.product_id_fk
            WHERE po.deleted = 0
            GROUP BY p.product_id, p.name
            ORDER BY total_sold DESC;
        `;
    
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    console.error("SQL Error:", error);
                    return reject(new Error(`SQL Error: ${error.message}`));
                }
                console.log("SQL Results:", results);
    
                if (!Array.isArray(results)) {
                    return reject(new Error('Unexpected result format'));
                }
    
                try {
                    const formattedResults = results.map((row: any) => {
                        if (typeof row === 'object' && row !== null) {
                            const { product_id, name, total_sold } = row;
    
                            // Convert total_sold to number
                            const totalSoldNumber = Number(total_sold);
    
                            if (typeof product_id === 'number' && !isNaN(product_id) &&
                                typeof name === 'string' && name.trim() !== '' &&
                                typeof totalSoldNumber === 'number' && !isNaN(totalSoldNumber)) {
                                return {
                                    product_id,
                                    name,
                                    total_sold: totalSoldNumber
                                };
                            } else {
                                console.error("Invalid data format:", row);
                                throw new Error('Invalid data format');
                            }
                        } else {
                            console.error("Unexpected row format:", row);
                            throw new Error('Unexpected row format');
                        }
                    });
    
                    console.log("Formatted Results:", formattedResults);
                    resolve(formattedResults);
                } catch (validationError) {
                    console.error("Validation Error:", validationError);
                    reject(validationError);
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
