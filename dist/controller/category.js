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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_1 = __importDefault(require("../model/category"));
// Create category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const newCategory = new category_1.default(categoryName);
        const result = yield newCategory.createCategory();
        res.status(201).json({
            result,
            message: "Category created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create category",
        });
    }
});
exports.createCategory = createCategory;
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.getCategories();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch categories",
        });
    }
});
exports.getCategories = getCategories;
// Get category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.getCategoryById(Number(id));
        if (!category) {
            res.status(404).json({
                error: `Category with ID ${id} not found`,
            });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch category",
        });
    }
});
exports.getCategoryById = getCategoryById;
// Update category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;
        const category = new category_1.default(categoryName);
        const result = yield category.updateCategory(Number(id));
        res.status(200).json({
            result,
            message: "Category updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to update category",
        });
    }
});
exports.updateCategory = updateCategory;
// Delete category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_1.default.deleteCategory(Number(id));
        res.status(200).json({
            result,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to delete category",
        });
    }
});
exports.deleteCategory = deleteCategory;
