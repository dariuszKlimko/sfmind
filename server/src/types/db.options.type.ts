import { SequelizeOptions } from "sequelize-typescript";

export type DbOptions = {
  [key: string]: SequelizeOptions;
};
