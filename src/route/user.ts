import express from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controller/user";
const router = express.Router();
router.post("/register", registerUser);
router.get("/user", getUsers);
router.get("user/:id", getUserById);
router.put("user/:id", updateUser);
router.delete("user/:id", deleteUser);
router.post("/login", loginUser);

export default router;
// Compare this snippet from src/controller/product.ts:
