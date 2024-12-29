import express from "express";
import multer from "multer";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProducts,
  deleteProducts,
} from "../controller/product";
import { authUser } from "../middleware/authUser";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/", authUser, getProducts); // to get products
router.get("/:id", authUser, getProductById); // to get products by id
router.post("/", authUser, upload.single("image"), createProduct); // to post product data
router.put("/:id", authUser, upload.single("image"), updateProducts); // to update the product data
router.delete("/:id", authUser, deleteProducts); // to delete the product data
export default router;
