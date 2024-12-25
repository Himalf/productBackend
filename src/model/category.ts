import db from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface ICategory extends RowDataPacket {
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

  static async getCategories(): Promise<ICategory[]> {
    try {
      const rows = await db.execute<ICategory[]>("SELECT * FROM categories");
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to get categories: `);
    }
  }

  static async getCategoryById(categoryId: number): Promise<ICategory | null> {
    try {
      const [rows] = await db.execute<ICategory[]>(
        "SELECT * FROM categories WHERE categoryId = ?",
        [categoryId]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get category by ID: `);
    }
  }

  async updateCategory(categoryId: number) {
    try {
      let sql = `UPDATE categories SET categoryName = '${this.categoryName}' WHERE categoryId = ${categoryId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to update category: `);
    }
  }

  static async deleteCategory(categoryId: number) {
    try {
      let sql = `DELETE FROM categories WHERE categoryId = ${categoryId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to delete category: `);
    }
  }
}

export default CATEGORY;
