// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(bodyparser.json());
const port = process.env.PORT || 3000;
import Category from "./route/category";
import bodyParser from "body-parser";
app.use("/categories", Category);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
