import db from "../config/db";
import { RowDataPacket } from "mysql2"; // Import RowDataPacket type for proper typing

interface Category {
  categoryId: number;
  categoryName: string;
}
class CATEGORY {
  categoryName: string;
  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }
  createCategory() {
    let sql = `INSERT INTO categories (categoryName) VALUES ('${this.categoryName}')`;
    return db.execute(sql);
  }
  static getCategories() {
    let sql = `SELECT * FROM categories`;
    return db.execute(sql);
  }
  static getCategoryById(categoryId: number) {
    let sql = `SELECT * FROM categories WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
  updateCategory(categoryId: number) {
    let sql = `UPDATE categories SET categoryName = '${this.categoryName}' WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
  static deleteCategory(categoryId: number) {
    let sql = `DELETE FROM categories WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
}
export default CATEGORY;
