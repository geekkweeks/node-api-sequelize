import { Sequelize } from "sequelize";
import "dotenv/config";

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging:
      process.env.NODE_EN === "development"
        ? (...msg) => console.log(msg)
        : false,
    dialectOptions: {
      requestTimeout: 30000,
      encrypt: true,
    },
  }
);

export default sequelize;
