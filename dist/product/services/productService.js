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
exports.ProductService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class ProductService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error retrieving products: ${error.message}`);
            }
        });
    }
    static getProductManuales() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findManuales();
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static getProductElectricos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findElectricos();
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static getProductConstruccion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findConstruccion();
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static getProductOtherMore() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findOtherMore();
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static getProductById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findById(product_id);
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static addProduct(product, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urlProject = process.env.BASE_URL || 'http://localhost';
                const portProject = process.env.PORT || '3002';
                product.url = `${urlProject}:${portProject}/uploads/${file.filename}`;
                product.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                product.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                product.created_by = 'Usuario que crea el registro';
                product.updated_by = 'Usuario que actualizó por última vez el registro';
                return yield ProductRepository_1.ProductRepository.createProduct(product);
            }
            catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
    static updateProduct(product_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = DateUtils_1.DateUtils.formatDate(new Date());
                productData.updated_at = currentDate;
                return yield ProductRepository_1.ProductRepository.updateProduct(product_id, productData);
            }
            catch (error) {
                throw new Error(`Error updating product: ${error.message}`);
            }
        });
    }
    static deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.deleteProduct(product_id);
            }
            catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        });
    }
    static deleteProductLogic(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.deleteProductLogic(product_id);
            }
            catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
