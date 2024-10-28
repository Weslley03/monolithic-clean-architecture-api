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
};

export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {};

  public static create(userGateway: UserGateway) {
    return new UpdateUserUsecase(userGateway);
  };

  public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    const userDto = await this.userGateway.findUserById(input.User_Id);
    if(!userDto) throw new Error('user not found');

    if(input.newAvatar) userDto.User_Avatar = input.newAvatar;
    if(input.newName) userDto.User_Name = input.newName;
    if(input.newUsername) userDto.User_Username = input.newUsername;  

    await this.userGateway.updateUser(userDto);
    return { success: true }; 
  };
};  
