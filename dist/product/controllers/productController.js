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
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
class ProductController {
    static getAllProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService_1.ProductService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProductManuales(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService_1.ProductService.getProductManuales();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProductElectricos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService_1.ProductService.getProductElectricos();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProductConstruccion(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService_1.ProductService.getProductConstruccion();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProductOtherMore(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService_1.ProductService.getProductOtherMore();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = parseInt(req.params.product_id);
                const product = yield productService_1.ProductService.getProductById(product_id);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const file = req.file;
                if (!file) {
                    res.status(400).json({ message: "Product image is required" });
                    return;
                }
                // Save the image URL in the product
                product.imageUrl = `/uploads/${file.filename}`;
                const newProduct = yield productService_1.ProductService.addProduct(product, file);
                res.status(201).json(newProduct);
            }
            catch (error) {
                console.error('Error in addProduct:', error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = parseInt(req.params.product_id);
                const productData = req.body;
                const updatedProduct = yield productService_1.ProductService.updateProduct(product_id, productData);
                if (updatedProduct) {
                    res.status(200).json(updatedProduct);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = parseInt(req.params.product_id);
                const success = yield productService_1.ProductService.deleteProduct(product_id);
                if (success) {
                    res.status(200).json({ message: "Product deleted successfully" });
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteProductLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = parseInt(req.params.product_id);
                const success = yield productService_1.ProductService.deleteProductLogic(product_id);
                if (success) {
                    res.status(200).json({ message: "Product deleted logically" });
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
