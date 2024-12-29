import db from "../config/db";
import { RowDataPacket } from "mysql2";
export interface IUser extends RowDataPacket {
  userId: number;
  name: string;
  email: string;
  password: string;
}
class USER {
  name: string;
  email: string;
  password: string;
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  createUser() {
    let sql = `INSERT INTO users (name, email, password) VALUES ('${this.name}', '${this.email}', '${this.password}')`;
    return db.execute(sql);
  }
  static async getUsers(): Promise<IUser[]> {
    try {
      const sql = `SELECT * FROM users`;
      const [rows] = await db.execute(sql);
      return rows as IUser[];
    } catch (error) {
      throw new Error("Failed to fetch users.");
    }
  }
  static async getUserById(userId: number): Promise<IUser | null> {
    try {
      const [rows] = await db.execute<IUser[]>(
        "SELECT * FROM users WHERE userId = ?",
        [userId]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get user by ID: `);
    }
  }
  async updateUser(userId: number) {
    try {
      let sql = `UPDATE users SET name = '${this.name}', email = '${this.email}', password = '${this.password}' WHERE userId = ${userId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to update user: `);
    }
  }
  static async deleteUser(userId: number) {
    try {
      let sql = `DELETE FROM users WHERE userId = ${userId}`;
      return db.execute(sql);
    } catch (error) {
      throw new Error(`Failed to delete user: `);
    }
  }
  static async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const [rows] = await db.execute<IUser[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get user by email: `);
    }
  }
}
export default USER;
