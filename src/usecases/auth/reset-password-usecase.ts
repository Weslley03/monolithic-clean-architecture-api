import { sendPasswordResetEmail } from "../../domain/services/email-service";
import { generateToken } from "../../domain/services/generate-token-service";
import { LoginGateway } from "../../domain/user/gateway/gateway-login";
import { Usecase } from "../usecase";

export type ResetPassowordInputDto = {
  User_Email: string;
};

export type ResetPassowordOutputDto = {
  User_Token: string;
};

export class ResetPasswordUsecase implements Usecase<ResetPassowordInputDto, ResetPassowordOutputDto> {
  private constructor(private resetPasswordGateway: LoginGateway) {};

  public static create(resetPasswordGateway: LoginGateway) {
    return new ResetPasswordUsecase(resetPasswordGateway);
  };

  public async execute(input: ResetPassowordInputDto): Promise<ResetPassowordOutputDto> {
    try{
      const { User_Email } = input
      const user = await this.resetPasswordGateway.findUser(User_Email);
      if(!user) throw new Error('user not found');
  
      const userToken = await generateToken(user.User_Id);

      await sendPasswordResetEmail(User_Email, userToken);

      const output = this.presentOutput(userToken);
      return output;
    }catch(err){
      console.error(err)
      throw new Error('an unknown error occurred');
    }; 
  };
  
  private presentOutput(userToken: string): ResetPassowordOutputDto {
    const present: ResetPassowordOutputDto = {
      User_Token: userToken,
    }
    return present;
  };
};