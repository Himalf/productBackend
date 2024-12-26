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
const db_1 = __importDefault(require("../config/db"));
class CATEGORY {
    constructor(categoryName) {
        this.categoryName = categoryName;
    }
    createCategory() {
        let sql = `INSERT INTO categories (categoryName) VALUES ('${this.categoryName}')`;
        return db_1.default.execute(sql);
    }
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield db_1.default.execute("SELECT * FROM categories");
                return rows[0];
            }
            catch (error) {
                throw new Error(`Failed to get categories: `);
            }
        });
    }
    static getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.execute("SELECT * FROM categories WHERE categoryId = ?", [categoryId]);
                return rows[0] || null;
            }
            catch (error) {
                throw new Error(`Failed to get category by ID: `);
            }
        });
    }
    updateCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `UPDATE categories SET categoryName = '${this.categoryName}' WHERE categoryId = ${categoryId}`;
                return db_1.default.execute(sql);
            }
            catch (error) {
                throw new Error(`Failed to update category: `);
            }
        });
    }
    static deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `DELETE FROM categories WHERE categoryId = ${categoryId}`;
                return db_1.default.execute(sql);
            }
            catch (error) {
                throw new Error(`Failed to delete category: `);
            }
        });
    }
}
exports.default = CATEGORY;
