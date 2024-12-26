"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const product_1 = require("../controller/product");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", product_1.getProducts); // to get products
router.get("/:id", product_1.getProductById); // to get products by id
router.post("/", upload.single("image"), product_1.createProduct); // to post product data
router.put("/:id", upload.single("image"), product_1.updateProducts); // to update the product data
router.delete("/:id", product_1.deleteProducts); // to delete the product data
exports.default = router;
