import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 5000;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_aksq0i4cdnXZ@ep-misty-lab-aqs2gmdp-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
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
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
};
initDB();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "me",
    age: "infinity",
  });
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      ` INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
        RETURNING * 
        `,
      [name, email, password, age],
    );
    console.log(result);
    res.status(201).json({
      message: "created",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users 
    `);
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
    console.log(result.rows);
  } catch (error: any) {
    console.log(error);
    res.status(505).json({
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
    `,
      [id],
    );
    if(result.rows.length === 0 ){
        res.status(404).json({
      success: false,
      message: "user not found!",
      data: {},
    });
    }
    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
    console.log(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(505).json({
      message: error.message,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
