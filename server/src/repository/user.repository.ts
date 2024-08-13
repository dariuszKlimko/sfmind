import User from "@app/models/user.model";
import { UserRepositoryIntrface } from "@app/interfaces/repository/user.repository.interface";
import { BaseRepository } from "@app/repository/base.repository";
import { ModelCtor } from "sequelize-typescript";

export class UserRepository extends BaseRepository<User> implements UserRepositoryIntrface {
  constructor(userModel: ModelCtor<User>) {
    super(userModel);
  }
}
