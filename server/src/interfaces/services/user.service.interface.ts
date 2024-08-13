import User from "@app/models/user.model";
import { BaseServiceInterface } from "@app/interfaces/services/base.service.interface";

export interface UserServiceInterface extends BaseServiceInterface<User> {}
