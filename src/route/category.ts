import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} from "../controller/category";
router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);
export default router;
