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
exports.deleteProducts = exports.updateProducts = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../model/product"));
// create the product data
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        console.log(image, "hello image");
        const { title, price, description, categoryId } = req.body;
        const newProduct = new product_1.default(title, price, description, image, categoryId);
        const result = yield newProduct.createProduct();
        res.status(201).json({
            result,
            message: "Product created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create product",
        });
    }
});
exports.createProduct = createProduct;
// get the product data
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = Number(req.query.limit) || 0;
        const sort = typeof req.query.sort === "string" ? req.query.sort : "asc";
        const products = yield product_1.default.getProducts(limit, sort);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
});
exports.getProducts = getProducts;
// get the single product
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.getProductById(Number(id));
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
});
exports.getProductById = getProductById;
// update the product data
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const { id } = req.params;
        const { title, price, description, categoryId } = req.body;
        const newProduct = new product_1.default(title, price, description, image, categoryId);
        const result = yield newProduct.updateProduct(Number(id));
        res.status(201).json({
            result,
            msg: " Data Updataed succesfully",
        });
    }
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
});
exports.updateProducts = updateProducts;
// delete the product data
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteProducts = yield product_1.default.deleteProduct(Number(id));
        res.status(200).json({
            deleteProducts,
            msg: `The product of id: ${id} deleted successfully `,
        });
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
});
exports.deleteProducts = deleteProducts;
