import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProducts,
  deleteProducts,
} from "../controller/product";
router.get("/", getProducts); // to get products
router.get("/:id", getProductById); // to get products by id
router.post("/", createProduct); // to post product data
router.put("/:id", updateProducts); // to update the product data
router.delete("/:id", deleteProducts); // to delete the product data
export default router;
