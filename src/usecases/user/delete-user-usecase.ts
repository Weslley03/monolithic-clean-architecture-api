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
    try{
      const { User_Id } = userId;
      await this.userGateway.deleteUser(User_Id);
      return { success: true }; 
    }catch(err){
      if(err instanceof Error) {
        if(err.message === 'user not found') {
          throw new Error('user not found');
        };
        throw err;
      };
      throw new Error('an unknown error occurred');
    };
  };
};