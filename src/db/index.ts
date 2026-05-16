import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.CONNECTION_STRING,
});

export const initDB = async () => {
  try {
    console.log("Creating users table...");
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(20),
                email VARCHAR(20) NOT NULL,
                password VARCHAR(20) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()

            )`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY ,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      gender VARCHAR(10),
  
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
    console.log("Profiles table created");
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
};
