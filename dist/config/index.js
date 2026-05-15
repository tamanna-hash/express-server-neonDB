import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env")
});
export const config = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    PORT: process.env.PORT
};
//# sourceMappingURL=index.js.map