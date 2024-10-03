import { Request, Response } from "express";
import { DeleteUserInputDto, DeleteUserUsecase } from "../../../../../usecases/user/delete-user-usecase";
import { HttpMethod, Route } from "../routes";

export type DeleteUserResponseDto = {
  success: boolean;
};

export class DeleteUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteUserService: DeleteUserUsecase
  ) {};

  public static create(deleteUserService: DeleteUserUsecase) {
    return new DeleteUserRoute(
      '/user-delete/:User_Id',
      HttpMethod.DELETE,
      deleteUserService,
    );
  };

  public getHandler() {
    return [ 
      async (req: Request, res: Response) => {
        const { User_Id } = req.params;
        const input: DeleteUserInputDto = { User_Id }; 
        const output: DeleteUserResponseDto = await this.deleteUserService.execute(input);
        res.status(202).json(output).send();
      }
    ];
  };

  public getPath(): string {
    return this.path;
  };
  public getMethod(): HttpMethod {
    return this.method;
  };
};