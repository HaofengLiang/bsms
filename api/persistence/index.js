import { Sequelize } from "sequelize";
import businessModel from "./models/business.model.js";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
  }
);

const models = [businessModel];

for (const model of models) {
  model(db);
}

export default db;
