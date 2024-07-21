import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../../shared/config/database";
import { Product } from "../models/Product";

export class ProductRepository {
   
    public static async findAll(): Promise<Product[]> {
        const query = "SELECT * FROM product WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = (results as RowDataPacket[]).map((row: RowDataPacket) => ({
                        ...row,
                        price: parseFloat(row.price as string) 
                    })) as Product[];
                    resolve(products);
                }
            });
        });
    }

    public static async findManuales(): Promise<Product[]> {
        const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 1";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = (results as RowDataPacket[]).map((row: RowDataPacket) => ({
                        ...row,
                        price: parseFloat(row.price as string) 
                    })) as Product[];
                    resolve(products);
                }
            });
        });
    }

    public static async findElectricos(): Promise<Product[]> {
        const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 2";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = (results as RowDataPacket[]).map((row: RowDataPacket) => ({
                        ...row,
                        price: parseFloat(row.price as string) 
                    })) as Product[];
                    resolve(products);
                }
            });
        });
    }

    public static async findConstruccion(): Promise<Product[]> {
        const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 3";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = (results as RowDataPacket[]).map((row: RowDataPacket) => ({
                        ...row,
                        price: parseFloat(row.price as string) 
                    })) as Product[];
                    resolve(products);
                }
            });
        });
    }

    public static async findOtherMore(): Promise<Product[]> {
        const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 4";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = (results as RowDataPacket[]).map((row: RowDataPacket) => ({
                        ...row,
                        price: parseFloat(row.price as string) 
                    })) as Product[];
                    resolve(products);
                }
            });
        });
    }

    public static async findById(product_id: number): Promise<Product | null> {
        const query = "SELECT * FROM product WHERE deleted = 0 AND product_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [product_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = results as Product[];
                    if (products.length > 0) {
                        resolve(products[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByPrice(price: number): Promise<Product | null> {
        const query = "SELECT * FROM product WHERE price = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [price], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const products: Product[] = results as Product[];
                    if (products.length > 0) {
                        resolve(products[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async createProduct(product: Product): Promise<Product> {
        const query = 'INSERT INTO product (name, description, price, stock, url, category_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [
                product.name,
                product.description,
                product.price,
                product.stock,
                product.url,
                product.category_id_fk,
                product.created_at,
                product.created_by,
                product.updated_at,
                product.updated_by,
                product.deleted ? 1 : 0
            ], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createProductId = (result as ResultSetHeader).insertId;
                    const createdProduct: Product = { ...product, product_id: createProductId };
                    resolve(createdProduct);
                }
            });
        });
    }

    public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
        const query = `UPDATE product SET name = ?, description = ?, price = ?, stock = ?, category_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE product_id = ?`;
        const values = [
            productData.name,
            productData.description,
            productData.price,
            productData.stock,
            productData.category_id_fk,
            productData.updated_at,
            productData.updated_by,
            productData.deleted ? 1 : 0,
            product_id
        ];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        const updatedProduct: Product = { ...productData, product_id: product_id };
                        resolve(updatedProduct);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteUser(product_id: number): Promise<boolean> {
        const query = 'DELETE FROM product WHERE product_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [product_id], (error, result) => {
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

    public static async deleteProductLogic(product_id: number): Promise<boolean> {
        const query = 'UPDATE product SET deleted = 1 WHERE product_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [product_id], (error, result) => {
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
