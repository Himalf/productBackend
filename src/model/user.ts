import db from "../config/db";
export interface IUser {
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
  static async getUsers(): Promise<any> {
    try {
      const sql = `SELECT * FROM users`;
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw new Error("Failed to fetch users.");
    }
  }
}
