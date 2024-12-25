import db from "../config/db";
import { RowDataPacket } from "mysql2";

// dEFINING THE INTERFACE FOR THE PRODUCT
export interface IProduct extends RowDataPacket {
  productId: number;
  title: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
}
class PRODUCT {
  title: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  constructor(
    title: string,
    price: number,
    description: string,
    image: string,
    categoryId: number
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.categoryId = categoryId;
  }
  createProduct() {
    let sql = `INSERT INTO products (title, price, description, image, categoryId) VALUES ('${this.title}', ${this.price}, '${this.description}', '${this.image}', ${this.categoryId})`;
    return db.execute(sql);
  }
  static async getProducts(): Promise<IProduct[]> {
    try {
      const rows = await db.execute<IProduct[]>("SELECT * FROM products");
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to get products: `);
    }
  }
  static async getProductById(productId: number): Promise<IProduct | null> {
    try {
      const [rows] = await db.execute<IProduct[]>(
        "SELECT * FROM products WHERE productId = ?",
        [productId]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get product by ID: `);
    }
  }
  async updateProduct(productId: number) {
    try {
      let sql = `UPDATE products SET title = '${this.title}', price = ${this.price}, description = '${this.description}', image = '${this.image}', categoryId = ${this.categoryId} WHERE productId = ${productId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to update product: `);
    }
  }
  static async deleteProduct(productId: number) {
    try {
      let sql = `DELETE FROM products WHERE productId = ${productId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to delete product: `);
    }
  }
}

export default PRODUCT;
