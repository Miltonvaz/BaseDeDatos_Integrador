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
exports.ProductRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class ProductRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results.map((row) => (Object.assign(Object.assign({}, row), { price: parseFloat(row.price) })));
                        resolve(products);
                    }
                });
            });
        });
    }
    static findManuales() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 1";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results.map((row) => (Object.assign(Object.assign({}, row), { price: parseFloat(row.price) })));
                        resolve(products);
                    }
                });
            });
        });
    }
    static findElectricos() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 2";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results.map((row) => (Object.assign(Object.assign({}, row), { price: parseFloat(row.price) })));
                        resolve(products);
                    }
                });
            });
        });
    }
    static findConstruccion() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 3";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results.map((row) => (Object.assign(Object.assign({}, row), { price: parseFloat(row.price) })));
                        resolve(products);
                    }
                });
            });
        });
    }
    static findOtherMore() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0 AND category_id_fk = 4";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results.map((row) => (Object.assign(Object.assign({}, row), { price: parseFloat(row.price) })));
                        resolve(products);
                    }
                });
            });
        });
    }
    static findById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE deleted = 0 AND product_id = ?";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [product_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results;
                        if (products.length > 0) {
                            resolve(products[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByPrice(price) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE price = ?";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [price], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results;
                        if (products.length > 0) {
                            resolve(products[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO product (name, description, price, stock, url, category_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [
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
                    }
                    else {
                        const createProductId = result.insertId;
                        const createdProduct = Object.assign(Object.assign({}, product), { product_id: createProductId });
                        resolve(createdProduct);
                    }
                });
            });
        });
    }
    static updateProduct(product_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedProduct = Object.assign(Object.assign({}, productData), { product_id: product_id });
                            resolve(updatedProduct);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM product WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [product_id], (error, result) => {
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
    static deleteProductLogic(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE product SET deleted = 1 WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [product_id], (error, result) => {
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
exports.ProductRepository = ProductRepository;
