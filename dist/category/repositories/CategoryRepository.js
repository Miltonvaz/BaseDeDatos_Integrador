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
exports.CategoryRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class CategoryRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM category', (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const categories = result;
                        resolve(categories);
                    }
                });
            });
        });
    }
    static findById(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM category WHERE category_id = ?', [category_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const categories = result;
                        if (categories.length > 0) {
                            resolve(categories[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO category (name, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                category.updated_by = category.created_by;
                database_1.default.execute(query, [
                    category.name,
                    category.created_at,
                    category.created_by,
                    category.updated_at,
                    category.updated_by,
                    category.deleted ? 1 : 0 // Convert boolean to 1 or 0
                ], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdCategoryId = result.insertId;
                        const createdCategory = Object.assign(Object.assign({}, category), { category_id: createdCategoryId });
                        resolve(createdCategory);
                    }
                });
            });
        });
    }
    static updateCategory(categoryId, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, updated_at, updated_by, deleted } = categoryData;
            const query = 'UPDATE category SET name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE category_id = ?';
            const params = [
                name,
                updated_at,
                updated_by,
                deleted ? 1 : 0, // Convert boolean to 1 or 0
                categoryId
            ];
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, params, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedCategory = Object.assign(Object.assign({}, categoryData), { category_id: categoryId });
                            resolve(updatedCategory);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteCategory(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM category WHERE category_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [category_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result.affectedRows > 0);
                    }
                });
            });
        });
    }
    static deleteCategoryLogic(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE category SET deleted = 1 WHERE category_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [category_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result.affectedRows > 0);
                    }
                });
            });
        });
    }
}
exports.CategoryRepository = CategoryRepository;
