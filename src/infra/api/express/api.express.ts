import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/routes";

export class ApiExpress implements Api {
  private app: Express;
  
  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  };

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  };

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handlers = route.getHandler();

      this.app[method](path, handlers);
    });
  };

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}...`);
      this.listenRoutes();
    });
  };  

  public listenRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });
    console.log(routes);
  };
};