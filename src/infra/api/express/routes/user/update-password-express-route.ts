import { HttpMethod, Route } from "../routes";
import { authMiddleware } from "../../../../../middlewares/auth/auth.middlewares";
import { Request, Response, NextFunction } from "express";
import { UpdatePasswordInputDto, UpdatePasswordUsecase } from "../../../../../usecases/user/reset-password-usecase";

export type UpdatePasswordResponseDto = {
  success: boolean;
};

export class UpdatePasswordRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updatePasswordService: UpdatePasswordUsecase
  ) {};

  public static create(resetPasswordService: UpdatePasswordUsecase) {
    return new UpdatePasswordRoute(
    '/update-password',
    HttpMethod.PATCH,
    resetPasswordService,
    );
  };

  private async middlwareValidate(req: Request, res: Response, next: NextFunction) {
    await authMiddleware(req, res, next);
  };

  public getHandler() {
    return [
      this.middlwareValidate,
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const {
            User_NewPassword, 
          } = req.body;

          const User_Id = req.userId;

          if(!User_Id) throw new Error('where are you req.userId?');

          const input: UpdatePasswordInputDto = {
            User_NewPassword,
            User_Id
          };

          const output: UpdatePasswordResponseDto =  await this.updatePasswordService.execute(input);
          res.status(201).json(output).send();
        }catch(err){
          next(err);
        }
      }
    ]
  };  

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};