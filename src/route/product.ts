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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get("/", getProducts); // to get products
router.get("/:id", getProductById); // to get products by id
router.post("/", upload.single("image"), createProduct); // to post product data
router.put("/:id", updateProducts); // to update the product data
router.delete("/:id", deleteProducts); // to delete the product data
export default router;
