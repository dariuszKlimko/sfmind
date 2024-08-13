import { continentList } from "@app/constants/continent.list";
import { Route } from "@app/interfaces/controllers/route.interface";
import express, { Request, Response } from "express";

export class ContinentController implements Route {
  public app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  public getRoutes(): void {
    this.app.get("/api/continents", async (req: Request, res: Response): Promise<Response> => {
      try {
        return res.status(200).send(continentList);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
}
