import User from "@app/models/user.model";
import { EntityNotFound } from "@app/exceptions/entity.not.fount";
import { Route } from "@app/interfaces/controllers/route.interface";
import { UserServiceInterface } from "@app/interfaces/services/user.service.interface";
import { userCreateValidator } from "@app/middleware/user.create.validator";
import express, { Request, Response } from "express";

export class UserController implements Route {
  public readonly app: express.Application;
  public readonly userService: UserServiceInterface;

  constructor(app: express.Application, userService: UserServiceInterface) {
    this.app = app;
    this.userService = userService;
  }

  public getRoutes(): void {
    this.app.post("/api/form", userCreateValidator, async (req: Request, res: Response): Promise<Response> => {
      try {
        let user: User = req.body;
        user = await this.userService.createOne(user);
        user = await this.userService.saveOne(user);
        return res.status(201).send(user);
      } catch (error) {
          res.status(500).send(error.message);
      }
    });

    this.app.get("/api/form", async (req: Request, res: Response): Promise<Response> => {
      try {
        const userList: User[] = await this.userService.findAll();
        return res.status(200).send(userList);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    this.app.delete("/api/form", async (req: Request, res: Response): Promise<Response> => {
      try {
        await this.userService.clearAllTable();
        return res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    this.app.get("/api/form/:id", async (req: Request, res: Response): Promise<Response> => {
      try {
        const userId: string = req.params.id;
        const user: User = await this.userService.findOne(userId);
        return res.status(200).send(user);
      } catch (error) {
        if (error instanceof EntityNotFound) {
          res.status(400).send(error.message);
        } else {
          res.status(500).send(error.message);
        }
      }
    });
  }
}
