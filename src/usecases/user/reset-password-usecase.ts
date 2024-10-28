import { UpdatePasswordGateway } from "../../domain/user/gateway/gateway-reset-password";
import { Usecase } from "../usecase";

export type UpdatePasswordInputDto = {
  User_Id: string;
  User_NewPassword: string;
};

export type UpdatePasswordOutputDto = {
  success: boolean;
};

export class UpdatePasswordUsecase implements Usecase<UpdatePasswordInputDto, UpdatePasswordOutputDto>{
  private constructor(private readonly resetPasswordGateway: UpdatePasswordGateway) {};

  public static create(resetPasswordGateway: UpdatePasswordGateway) {
    return new UpdatePasswordUsecase(resetPasswordGateway);
  };

  public async execute(input: UpdatePasswordInputDto): Promise<UpdatePasswordOutputDto> {
    const user = await this.resetPasswordGateway.findUserById(input.User_Id);
    if(!user) throw new Error('user not found');

    user.User_Password = input.User_NewPassword;
    await this.resetPasswordGateway.updatePassword(user);
    return { success: true };
  };
};