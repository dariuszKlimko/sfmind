import { CreateUserDto } from "@app/dtos/user.dto";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";

export async function userCreateValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    const user = new CreateUserDto();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.continent = req.body.continent;
    user.birthDate = req.body.birthDate;

    await validateOrReject(user, { whitelist: true });
    req.body = user;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}
