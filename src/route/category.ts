import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
  getCategoryById,
} from "../controller/category";
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);

export default router;
