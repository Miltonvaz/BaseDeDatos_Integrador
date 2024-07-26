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
exports.CategoryService = void 0;
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class CategoryService {
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CategoryRepository_1.CategoryRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error retrieving categories: ${error.message}`);
            }
        });
    }
    static getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CategoryRepository_1.CategoryRepository.findById(categoryId);
            }
            catch (error) {
                throw new Error(`Error finding category: ${error.message}`);
            }
        });
    }
    static addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                category.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                category.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield CategoryRepository_1.CategoryRepository.createCategory(Object.assign(Object.assign({}, category), { deleted: category.deleted || false // Set deleted to false if undefined
                 }));
            }
            catch (error) {
                throw new Error(`Error creating category: ${error.message}`);
            }
        });
    }
    static updateCategory(categoryId, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryFound = yield CategoryRepository_1.CategoryRepository.findById(categoryId);
                if (!categoryFound) {
                    throw new Error(`Category with ID ${categoryId} not found`);
                }
                if (categoryData.name) {
                    categoryFound.name = categoryData.name;
                }
                if (categoryData.updated_by) {
                    categoryFound.updated_by = categoryData.updated_by;
                }
                if (categoryData.updated_at) {
                    categoryFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                }
                if (categoryData.deleted !== undefined) {
                    categoryFound.deleted = categoryData.deleted;
                }
                const updatedCategory = yield CategoryRepository_1.CategoryRepository.updateCategory(categoryId, Object.assign(Object.assign({}, categoryFound), { deleted: categoryData.deleted || false }));
                if (!updatedCategory) {
                    throw new Error(`Could not update category with ID ${categoryId}`);
                }
                return updatedCategory;
            }
            catch (error) {
                throw new Error(`Error updating category: ${error.message}`);
            }
        });
    }
    static deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CategoryRepository_1.CategoryRepository.deleteCategory(categoryId);
            }
            catch (error) {
                throw new Error(`Error deleting category: ${error.message}`);
            }
        });
    }
    static deleteCategoryLogic(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CategoryRepository_1.CategoryRepository.deleteCategoryLogic(categoryId);
            }
            catch (error) {
                throw new Error(`Error logically deleting category: ${error.message}`);
            }
        });
    }
}
exports.CategoryService = CategoryService;
