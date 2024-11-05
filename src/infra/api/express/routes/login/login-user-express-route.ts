import { Request, Response, NextFunction } from "express";
import { LoginUserInputDto, LoginUserUsecase } from "../../../../../usecases/auth/login-user-usecase";
import { HttpMethod, Route } from "../routes";
import { loginUserSchema } from "../../../../../schemas/login-user-schema";
import { ZodError } from "zod";

export type LoginUserResponseDto = {
  User_Token: string;
  success: boolean;
};


export class LoginUserRoute  implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginUserService: LoginUserUsecase
  ) {};

  public static create(loginUserService: LoginUserUsecase) {
    return new LoginUserRoute(
      '/auth-login',
      HttpMethod.POST,
      loginUserService
    );
  };

  private loginUserValidate(req: Request, res: Response, next: NextFunction) {
    try{
      loginUserSchema.parse(req.body);
      next();
    }catch(err){
      if(err instanceof ZodError) {
        res.status(400).json({error: err.errors });
        console.error(`loginUserValidate error: ${err.message}`);
        return;
      }
      next(err);
    };  
  };

  public getHandler() {
    return [ 
      this.loginUserValidate,
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const { User_Email, User_Password } = req.body;
          const input: LoginUserInputDto = { User_Email, User_Password };

          const output: LoginUserResponseDto = await this.loginUserService.execute(input);

          const responseBody = this.presentOutput(output);
          res.status(200).json(responseBody).send();
        }catch(err){
          next(err);
        };
      }
    ]; 
  };

  private presentOutput(input: LoginUserResponseDto): LoginUserResponseDto {
    const response = { User_Token: input.User_Token, success: input.success };
    return response;
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};