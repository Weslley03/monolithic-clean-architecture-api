import { Request, Response, NextFunction } from "express";
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
      '/user-update/:User_Id',
      HttpMethod.PATCH,
      updateUserService
    );
  };

  public getHandler() {
    return [ 
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {
            User_Name, 
            User_Username, 
            User_Avatar,
          } = req.body;
  
          const { User_Id } = req.params;
  
  
          const input: UpdateUserInputDto = {
            User_Id: User_Id,
            newName: User_Name, 
            newUsername: User_Username, 
            newAvatar: User_Avatar,
          };
          const output: UpdateUserResponseDto = await this.updateUserService.execute(input); 
          res.status(200).json(output).send();
        }catch(err){
          next(err);
        };
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