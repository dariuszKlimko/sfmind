import { DbOperationsInterface } from "@app/interfaces/db.operations.interface";
import { Sequelize } from "sequelize-typescript";

export class DbOperations implements DbOperationsInterface {
  public sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  public async dbSync(): Promise<void> {
    try {
      await this.sequelize.sync({ force: true });
      console.log("DB synchronized.");
    } catch (error) {
      throw new Error(error);
    }
  }

  public async dbInit(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("DB connection ok.");
    } catch (error) {
      throw new Error(error);
    }
  }

  public async dbClose(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("DB connection closed.");
    } catch (error) {
      throw new Error(error);
    }
  }
}
