"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const category_1 = require("../controller/category");
router.get("/", category_1.getCategories);
router.get("/:id", category_1.getCategoryById);
router.post("/", category_1.createCategory);
router.put("/:id", category_1.updateCategory);
router.delete("/:id", category_1.deleteCategory);
exports.default = router;
