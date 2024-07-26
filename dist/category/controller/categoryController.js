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
exports.deleteCategoryLogic = exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const categoryService_1 = require("../services/categoryService");
const getAllCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService_1.CategoryService.getAllCategories();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const category = yield categoryService_1.CategoryService.getCategoryById(categoryId);
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCategoryById = getCategoryById;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield categoryService_1.CategoryService.addCategory(req.body);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const updatedCategory = yield categoryService_1.CategoryService.updateCategory(categoryId, req.body);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        }
        else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const deleted = yield categoryService_1.CategoryService.deleteCategory(categoryId);
        if (deleted) {
            res.status(200).json({ message: 'Category deleted successfully' });
        }
        else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
const deleteCategoryLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const deleted = yield categoryService_1.CategoryService.deleteCategoryLogic(categoryId);
        if (deleted) {
            res.status(200).json({ message: 'Category logically deleted successfully' });
        }
        else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategoryLogic = deleteCategoryLogic;
