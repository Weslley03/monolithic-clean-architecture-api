import { Usecase } from "../usecase";
import { UserGateway } from "../../domain/user/gateway/gateway-user";
import { User, UserProps } from "../../domain/user/entity/entity-user";

export type FindUserByIdInputDto = {
  User_Id: string;
};

export type FindUserByIdOutputDto = {
  User_Id?: string;
  User_Name: string;
  User_Email: string;
  User_Username: string;
  User_Avatar: string;
};

export class FindUserByIdUsecase implements Usecase<FindUserByIdInputDto, FindUserByIdOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {};

  public static create(userGateway: UserGateway) {
    return new FindUserByIdUsecase(userGateway);
  };

  public async execute(input: FindUserByIdInputDto): Promise<FindUserByIdOutputDto> {
    const { User_Id } = input;
    const user = await this.userGateway.findUserById(User_Id);
    if(!user) throw new Error('user not found');
    const output = this.presentOutput(user);
    return output;
  };

  private presentOutput(user: UserProps): FindUserByIdOutputDto {
    const present: FindUserByIdOutputDto = {
      User_Id: user.User_Id,
      User_Name: user.User_Name,
      User_Email: user.User_Email,
      User_Username: user.User_Username,
      User_Avatar: user.User_Avatar,
    } 
    return present;
  };
};