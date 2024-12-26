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
class PRODUCT {
    constructor(title, price, description, image, categoryId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.categoryId = categoryId;
    }
    // Insering data here
    createProduct() {
        let sql = `INSERT INTO products (title, price, description, image, categoryId) VALUES ('${this.title}', ${this.price}, '${this.description}', '${this.image}', ${this.categoryId})`;
        return db_1.default.execute(sql);
    }
    // Get all products
    static getProducts() {
        return __awaiter(this, arguments, void 0, function* (limit = 0, sort = "asc") {
            try {
                const orderBy = sort === "desc" ? "DESC" : "ASC";
                const limitClause = limit > 0 ? `LIMIT ${limit}` : "";
                const sql = `
        SELECT products.productId, products.title, products.price, products.description, products.image, categories.categoryName 
        FROM products 
        JOIN categories ON products.categoryId = categories.categoryId
        ORDER BY products.title ${orderBy}
        ${limitClause}
      `;
                const [rows] = yield db_1.default.execute(sql);
                return rows;
            }
            catch (error) {
                throw new Error("Failed to fetch products.");
            }
        });
    }
    // Get Products by ID
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.execute("SELECT * FROM products WHERE productId = ?", [productId]);
                return rows[0] || null;
            }
            catch (error) {
                throw new Error(`Failed to get product by ID: `);
            }
        });
    }
    // update the peoducts
    updateProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `UPDATE products SET title = '${this.title}', price = ${this.price}, description = '${this.description}', image = '${this.image}', categoryId = ${this.categoryId} WHERE productId = ${productId}`;
                return db_1.default.execute(sql);
            }
            catch (error) {
                throw new Error(`Failed to update product: `);
            }
        });
    }
    // Delete the products
    static deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `DELETE FROM products WHERE productId = ${productId}`;
                return db_1.default.execute(sql);
            }
            catch (error) {
                throw new Error(`Failed to delete product: `);
            }
        });
    }
}
exports.default = PRODUCT;
