import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { DbOptions } from "@app/types/db.options.type";
import path from "path";
import config from "config";

function dataBaseConfig(env: string): SequelizeOptions {
  const dataSourceOptionsProd: SequelizeOptions = {
    dialect: config.get("SQLITE_DIALECT"),
    storage: config.get("SQLITE_STORAGE"),
    models: [path.join(__dirname, "../models")],
    logging: true,
  };

  const dataSourceOptionsDev: SequelizeOptions = {
    ...dataSourceOptionsProd,
  };

  const dataSourceOptionsTest: SequelizeOptions = {
    ...dataSourceOptionsProd,
    database: `${process.env.DB_NAME}_test`,
  };

  const options: DbOptions = {
    production: dataSourceOptionsProd,
    development: dataSourceOptionsDev,
    test: dataSourceOptionsTest,
  };

  return options[env];
}

export const sequelize = new Sequelize(dataBaseConfig(process.env.NODE_ENV));
