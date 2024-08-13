import { GlobalRoute } from "@app/interfaces/controllers/global.route.interface";
import { Route } from "@app/interfaces/controllers/route.interface";

export class GlobalController implements GlobalRoute {
  public routeList: Route[];
  constructor(routeList: Route[]) {
    this.routeList = routeList;
  }

  public getAllRoutes(): void {
    for (const route of this.routeList) {
      route.getRoutes();
    }
  }
}
