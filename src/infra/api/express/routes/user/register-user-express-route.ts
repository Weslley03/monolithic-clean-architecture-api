import { Request, Response } from "express";
import { HttpMethod, Route } from "../routes";
import { RegisterUserInputDto, RegisterUserOutputDto, RegisterUserUsecase } from "../../../../../usecases/user/register-user-usecase";

export type RegisterUserResponseDto = {
  User_Id?: string;
};

export class RegisterUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly registerUserService: RegisterUserUsecase
  ) {};

  public static create(registerUserService: RegisterUserUsecase) {
    return new RegisterUserRoute(
      '/user-register',
      HttpMethod.POST,
      registerUserService
    );
  };

  public getHandler() {
    return async (req: Request, res: Response) => {
        const {     
          User_Name,
          User_Email,
          User_Password,
          User_Username,
      } = req.body;

      const input: RegisterUserInputDto = {     
        User_Name,
        User_Email,
        User_Password,
        User_Username,
      };

      const output: RegisterUserResponseDto = await this.registerUserService.execute(input);
      const responseBody = this.presentOutput(output);
      res.status(201).json(responseBody).send();
    };
  }

  private presentOutput(input: RegisterUserResponseDto): RegisterUserResponseDto {
    const response = { User_Id: input.User_Id };
    return response;
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};