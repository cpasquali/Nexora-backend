import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
});

const verifyDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Base de datos conectada correctamente");
  } catch (e) {
    console.log(e.message);
  }
};

verifyDatabase();
