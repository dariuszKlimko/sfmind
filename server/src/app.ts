process.env["NODE_CONFIG_DIR"] = __dirname + "/config";
import config from "config";
import "module-alias/register";
import { Http } from "@app/config/http";
import { BootstrapConfiguration } from "@app/config/bootstrap.configuration";
import { GlobalController } from "@app/controllers/global.controller";
import { Route } from "@app/interfaces/controllers/route.interface";
import { DbOperations } from "@app/config/db.operations";
import { sequelize } from "@app/config/sequlize";
import { ContinentController } from "@app/controllers/continents.controller";
import { UserController } from "@app/controllers/user.controller";
import { UserService } from "@app/services/user.service";
import { UserRepository } from "@app/repository/user.repository";
import User from "@app/models/user.model";

async function bootstrap(): Promise<void> {
  try {
    const dbConnection = new DbOperations(sequelize);
    await dbConnection.dbInit();
    await dbConnection.dbSync();

    const app = new BootstrapConfiguration().app;
    const http = new Http(app, config);
    http.createServer();

    const userRepository = new UserRepository(User);
    const userService = new UserService(userRepository);

    const controllerList: Route[] = [
        new UserController(app, userService), 
        new ContinentController(app)
    ];
    
    const globalRoute = new GlobalController(controllerList);
    globalRoute.getAllRoutes();
    
  } catch (error) {
    throw new Error(error);
  }
}

bootstrap();
