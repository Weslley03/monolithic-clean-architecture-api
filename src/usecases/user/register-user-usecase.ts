import { User } from "../../domain/user/entity/entity-user";
import { UserGateway } from "../../domain/user/gateway/gateway-user";
import { Usecase } from "../usecase";

export type RegisterUserInputDto = {
  User_Name: string;
  User_Email: string;
  User_Password: string;
  User_Username: string;
};

export type RegisterUserOutputDto = {
  User_Id?: string;
};

export class RegisterUserUsecase implements Usecase<RegisterUserInputDto, RegisterUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {};

  public static create(userGateway: UserGateway) {
    return new RegisterUserUsecase(userGateway);
  };

  public async execute({
    User_Name,
    User_Email,
    User_Password,
    User_Username,
  }: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
    const aUser = User.create(
      User_Name,
      User_Email,
      User_Password,
      User_Username,
    );
    await this.userGateway.registerUser(aUser);
    const output = this.presentOutput(aUser);
    return output;
  };

  private presentOutput(user: User): RegisterUserOutputDto {
    const present: RegisterUserOutputDto = {
      User_Id: user.User_Id
    }
    return present;
  };
};
