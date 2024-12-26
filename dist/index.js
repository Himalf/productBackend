"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import section
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const category_1 = __importDefault(require("./route/category"));
const product_1 = __importDefault(require("./route/product"));
dotenv_1.default.config();
// middlewares
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
app.use("/products", product_1.default);
app.use("/categories", category_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// listening to the port or running the server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
