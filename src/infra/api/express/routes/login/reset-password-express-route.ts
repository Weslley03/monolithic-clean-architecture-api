import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../routes";
import { ResetPassowordInputDto, ResetPassowordOutputDto, ResetPasswordUsecase } from "../../../../../usecases/auth/reset-password-usecase";

export type ResetPasswordResponseDto = {
  User_Token: string;
};

export class ResetPasswordRoute  implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly resetPasswordService: ResetPasswordUsecase
  ) {};

  public static create(resetPasswordService: ResetPasswordUsecase) {
    return new ResetPasswordRoute(
      '/reset-password',
      HttpMethod.GET,
      resetPasswordService
    );
  };

  public getHandler() {
    return [ 
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const { User_Email } = req.body;
          const input: ResetPassowordInputDto = { User_Email };
          const output: ResetPassowordOutputDto = await this.resetPasswordService.execute(input);
          const responseBody = this.presentOutput(output);
          res.status(200).json(responseBody).send();
        }catch(err){
          next(err);
        };
      }
    ]; 
  };

  private presentOutput(input: ResetPasswordResponseDto): ResetPasswordResponseDto {
    const response = { User_Token: input.User_Token };
    return response;
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};