import { UserRepositoryIntrface } from "@app/interfaces/repository/user.repository.interface";
import { BaseService } from "@app/services/base.service";
import User from "@app/models/user.model";
import { UserServiceInterface } from "@app/interfaces/services/user.service.interface";

export class UserService extends BaseService<User> implements UserServiceInterface {
  constructor(userRepository: UserRepositoryIntrface) {
    super(userRepository);
  }
}
