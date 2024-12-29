import USER from "../model/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const genSalt = await bcrypt.genSalt(10);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const user = new USER(name, email, hashedPassword);
    await user.createUser();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await USER.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await USER.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const user = new USER(name, email, password);
    await user.updateUser(userId);
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await USER.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await USER.getUserByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password ?? "");
      if (passwordMatch) {
        const token = jwt.sign(
          { email: user.email },
          process.env.SECRET_KEY ?? "",
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({ message: "Login successful.", token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
