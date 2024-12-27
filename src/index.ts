// Import section
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import Category from "./route/category";
import Product from "./route/product";
dotenv.config();
// middlewares
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
const port = process.env.PORT || 3000;

app.use("/products", Product);
app.use("/categories", Category);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
// listening to the port or running the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
