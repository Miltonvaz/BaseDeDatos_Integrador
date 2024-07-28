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
exports.deletePurchaseOrderLogic = exports.deletePurchaseOrder = exports.updatePurchaseOrder = exports.createPurchaseOrder = exports.getPurchaseOrderById = exports.getAllPurchaseOrders = void 0;
const purchaseOrderServices_1 = require("../services/purchaseOrderServices");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const productService_1 = require("../../product/services/productService");
const auth_1 = require("../../shared/middlewares/auth");
const getAllPurchaseOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseOrders = yield purchaseOrderServices_1.PurchaseOrderService.getAllPurchaseOrders();
        return res.status(200).json(purchaseOrders);
    }
    catch (error) {
        return res.status(500).json({ message: `Error retrieving purchase orders: ${error.message}` });
    }
});
exports.getAllPurchaseOrders = getAllPurchaseOrders;
const getPurchaseOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchaseOrder_id } = req.params;
    try {
        const purchaseOrder = yield purchaseOrderServices_1.PurchaseOrderService.getPurchaseOrderById(Number(purchaseOrder_id));
        if (purchaseOrder) {
            return res.status(200).json(purchaseOrder);
        }
        else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error finding purchase order: ${error.message}` });
    }
});
exports.getPurchaseOrderById = getPurchaseOrderById;
exports.createPurchaseOrder = [(0, auth_1.authorizeRole)(['Administrador', 'Empleado', 'Usuario']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { products, user_id_fk, street, city } = req.body;
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: 'Invalid or empty products array' });
            }
            if (typeof user_id_fk !== 'number' || user_id_fk <= 0) {
                return res.status(400).json({ message: 'Invalid user_id_fk' });
            }
            if (typeof street !== 'string' || street.trim() === '') {
                return res.status(400).json({ message: 'Invalid street' });
            }
            if (typeof city !== 'string' || city.trim() === '') {
                return res.status(400).json({ message: 'Invalid city' });
            }
            let total = 0;
            const productPromises = products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const productData = yield productService_1.ProductService.getProductById(product.id);
                if (!productData) {
                    throw new Error(`Product with ID ${product.id} not found`);
                }
                if (typeof productData.price !== 'number' || isNaN(productData.price) || productData.price <= 0) {
                    throw new Error(`Invalid price (${productData.price}) for product ID ${product.id}`);
                }
                total += productData.price * product.cantidad;
            }));
            try {
                yield Promise.all(productPromises);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
            if (typeof total !== 'number' || isNaN(total) || !isFinite(total)) {
                return res.status(400).json({ message: 'Invalid total amount' });
            }
            const newPurchaseOrder = {
                purchaseOrder_id: null,
                date: DateUtils_1.DateUtils.formatDate(new Date()),
                total: total,
                product_id_fk: products[0].id,
                user_id_fk: user_id_fk,
                street: street,
                city: city,
                cantidad: products[0].cantidad,
                status_id_fk: 1,
                created_by: 'API',
                updated_by: 'API',
                created_at: DateUtils_1.DateUtils.formatDate(new Date()),
                updated_at: DateUtils_1.DateUtils.formatDate(new Date()),
                deleted: false,
            };
            const createdPurchaseOrder = yield purchaseOrderServices_1.PurchaseOrderService.addPurchaseOrder(newPurchaseOrder);
            return res.status(201).json(createdPurchaseOrder);
        }
        catch (error) {
            return res.status(500).json({ message: `Error creating purchase order: ${error.message}` });
        }
    })];
exports.updatePurchaseOrder = [(0, auth_1.authorizeRole)(['Administrador', 'Empleado']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { purchaseOrder_id } = req.params;
        const { products, date, user_id_fk, street, city, status_id_fk, updated_by, deleted } = req.body;
        try {
            const existingPurchaseOrder = yield purchaseOrderServices_1.PurchaseOrderService.getPurchaseOrderById(Number(purchaseOrder_id));
            if (!existingPurchaseOrder) {
                return res.status(404).json({ message: `Purchase order not found` });
            }
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: 'Invalid products array' });
            }
            if (typeof user_id_fk !== 'number' || user_id_fk <= 0) {
                return res.status(400).json({ message: 'Invalid user_id_fk' });
            }
            if (typeof street !== 'string' || street.trim() === '') {
                return res.status(400).json({ message: 'Invalid street' });
            }
            if (typeof city !== 'string' || city.trim() === '') {
                return res.status(400).json({ message: 'Invalid city' });
            }
            let newTotal = 0;
            const productPromises = products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const productData = yield productService_1.ProductService.getProductById(product.id);
                if (!productData) {
                    throw new Error(`Product with ID ${product.id} not found`);
                }
                if (typeof productData.price !== 'number' || isNaN(productData.price) || productData.price <= 0) {
                    throw new Error(`Invalid price (${productData.price}) for product ID ${product.id}`);
                }
                newTotal += productData.price * product.cantidad;
            }));
            try {
                yield Promise.all(productPromises);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
            if (typeof newTotal !== 'number' || isNaN(newTotal) || !isFinite(newTotal)) {
                return res.status(400).json({ message: 'Invalid total amount' });
            }
            const updatedPurchaseOrderData = Object.assign(Object.assign({}, existingPurchaseOrder), { date: date || existingPurchaseOrder.date, total: newTotal, product_id_fk: products[0].id, user_id_fk: user_id_fk || existingPurchaseOrder.user_id_fk, street: street || existingPurchaseOrder.street, city: city || existingPurchaseOrder.city, status_id_fk: status_id_fk || existingPurchaseOrder.status_id_fk, updated_at: DateUtils_1.DateUtils.formatDate(new Date()), updated_by: updated_by || 'API', deleted: deleted !== undefined ? deleted : existingPurchaseOrder.deleted });
            const updatedPurchaseOrder = yield purchaseOrderServices_1.PurchaseOrderService.updatePurchaseOrder(Number(purchaseOrder_id), updatedPurchaseOrderData);
            return res.status(200).json(updatedPurchaseOrder);
        }
        catch (error) {
            return res.status(500).json({ message: `Error updating purchase order: ${error.message}` });
        }
    })];
exports.deletePurchaseOrder = [(0, auth_1.authorizeRole)(['Administrador', 'Empleado']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { purchaseOrder_id } = req.params;
        try {
            const success = yield purchaseOrderServices_1.PurchaseOrderService.deletePurchaseOrder(Number(purchaseOrder_id));
            if (success) {
                return res.status(200).json({ message: `Purchase order deleted successfully` });
            }
            else {
                return res.status(404).json({ message: `Purchase order not found` });
            }
        }
        catch (error) {
            return res.status(500).json({ message: `Error deleting purchase order: ${error.message}` });
        }
    })];
exports.deletePurchaseOrderLogic = [(0, auth_1.authorizeRole)(['Administrador', 'Empleado']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { purchaseOrder_id } = req.params;
        try {
            const success = yield purchaseOrderServices_1.PurchaseOrderService.deleteLogicalPurchaseOrder(Number(purchaseOrder_id));
            if (success) {
                return res.status(200).json({ message: `Purchase order deleted logically` });
            }
            else {
                return res.status(404).json({ message: `Purchase order not found` });
            }
        }
        catch (error) {
            return res.status(500).json({ message: `Error logically deleting purchase order: ${error.message}` });
        }
    })];
