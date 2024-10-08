import { Request, Response, NextFunction} from "express";
import { HttpMethod, Route } from "../routes";
import { 
  FindUserByIdInputDto, 
  FindUserByIdUsecase,
} from "../../../../../usecases/user/finduserbyid-user-usecase";

export type FindUserByIdResponseDto = {
  User_Id?: string;
  User_Name: string;
  User_Email: string;
  User_Username: string;
  User_Avatar: string;
};

export class FindUserByIdUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findUserByIdService: FindUserByIdUsecase
  ) {};

  public static create(findUserByIdService: FindUserByIdUsecase) {
    return new FindUserByIdUserRoute(
      '/user-findbyid/:User_Id',
      HttpMethod.GET,
      findUserByIdService
    );
  };

  getHandler() {
    return [ 
      async (req: Request, res: Response, next: NextFunction ) => {
        try {
          const { User_Id } = req.params;
          const input: FindUserByIdInputDto = { User_Id };
          const output: FindUserByIdResponseDto = await this.findUserByIdService.execute(input);
          const responseBody = this.presentOutput(output);
          res.status(200).json(responseBody).send();
        }catch(err){
          next(err);
        };
      }
    ];
  };

  private presentOutput(input: FindUserByIdResponseDto): FindUserByIdResponseDto {
    const response = {
      User_Id: input.User_Id,
      User_Name: input.User_Name,
      User_Email: input.User_Email,
      User_Username: input.User_Username,
      User_Avatar: input.User_Avatar,
    };
    return response;
  };

  public getPath(): string {
    return this.path;
  };
  
  public getMethod(): HttpMethod {
    return this.method;
  };
};