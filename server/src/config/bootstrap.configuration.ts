import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export class BootstrapConfiguration {
  public app: express.Application = express();

  constructor() {
    this.initConfiguration();
  }

  private initConfiguration(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors({origin: ["http://localhost:3000"]}));
  }
}
