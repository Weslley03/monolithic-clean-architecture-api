import { UserGateway } from "../../domain/user/gateway/gateway-user";
import { Usecase } from "../usecase";

export type UpdateUserInputDto = {
  User_Id: string
  newName?: string, 
  newUsername?: string, 
  newAvatar?: string
};

export type UpdateUserOutputDto = {
  success: boolean;
  message?: string;
};

export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {};

  public static create(userGateway: UserGateway) {
    return new UpdateUserUsecase(userGateway);
  };

  public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    const user = await this.userGateway.findUserById(input.User_Id);
    if(!user){
      return {
        success: false,
        message: 'user not found'
      };
    };
    if(input.newAvatar) user.updateAvatar(input.newAvatar);
    if(input.newName) user.updateName(input.newName);
    if(input.newUsername) user.updateUsername(input.newUsername);  
    await this.userGateway.updateUser(user);
    return { success: true }; 
  };
};  