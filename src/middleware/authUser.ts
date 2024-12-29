import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

export const authUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Attach user to request
    next(); // Call next middleware
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
