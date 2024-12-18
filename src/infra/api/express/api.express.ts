import { Api } from "../api";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { Route } from "./routes/routes";

export class ApiExpress implements Api {
  private app: Express;
  
  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
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

    this.app.use(this.errorHandler);
  };  

  private errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof Error){
      res.status(400).json({
        error: err.message,
      });
    }else {
      res.status(500).json({
        error: 'onternal server error',
      });
    };
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