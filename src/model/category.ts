import db from "../config/db";
class CATEGORY {
  categoryName: string;
  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }
  createCategory() {
    let sql = `INSERT INTO CATEGORY (categoryName) VALUES ('${this.categoryName}')`;
    return db.execute(sql);
  }
  static getCategories() {
    let sql = `SELECT * FROM CATEGORY`;
    return db.execute(sql);
  }
  static getCategoryById(categoryId: number) {
    let sql = `SELECT * FROM CATEGORY WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
  updateCategory(categoryId: number) {
    let sql = `UPDATE CATEGORY SET categoryName = '${this.categoryName}' WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
  static deleteCategory(categoryId: number) {
    let sql = `DELETE FROM CATEGORY WHERE categoryId = ${categoryId}`;
    return db.execute(sql);
  }
}
export default CATEGORY;
