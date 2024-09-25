import { UserGateway } from "../../domain/user/gateway/gateway-user";
import { Usecase } from "../usecase";

export type DeleteUserInputDto = {
  User_Id: string;
};

export type DeleteUserOutputDto = {
  success: boolean;
};

export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {};

  public static create(userGateway: UserGateway) {
    return new DeleteUserUsecase(userGateway);
  };

  public async execute(userId: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
    const { User_Id } = userId;
    await this.userGateway.deleteUser(User_Id);
    return { success: true }; 
  };
};