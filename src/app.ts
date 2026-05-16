import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/userRoute";
const app: Application = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

initDB();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "me",
    age: "infinity",
  });
});

app.use('/api/users',userRoute)





export default app;