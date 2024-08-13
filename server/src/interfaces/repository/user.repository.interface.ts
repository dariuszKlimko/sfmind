import User from "@app/models/user.model";
import { BaseInterfaceRepository } from "@app/interfaces/repository/base.repository.interface";

export interface UserRepositoryIntrface extends BaseInterfaceRepository<User> {}
