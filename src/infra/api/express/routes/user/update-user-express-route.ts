import { Request, Response } from "express";
import { HttpMethod, Route } from "../routes";
import { 
  UpdateUserInputDto, 
  UpdateUserUsecase, 
} from "../../../../../usecases/user/update-user-usecase";


export type UpdateUserResponseDto = {
  success: boolean;
};

export class UpdateUserRoute implements Route {
  private constructor(
    private readonly path: string, 
    private readonly method: HttpMethod,
    private readonly updateUserService: UpdateUserUsecase
  ) {};

  public static create(updateUserService: UpdateUserUsecase) {
    return new UpdateUserRoute(
      '/user-update',
      HttpMethod.PATCH,
      updateUserService
    );
  };

  public getHandler() {
    return async (req: Request, res: Response) => {
      const {
        User_Id,
        newName, 
        newUsername, 
        newAvatar,
      } = req.body;

      const input: UpdateUserInputDto = {
        User_Id,
        newName, 
        newUsername, 
        newAvatar,
      };

      const output: UpdateUserResponseDto = await this.updateUserService.execute(input); 
      res.status(200).json(output).send();
    };
  }

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};