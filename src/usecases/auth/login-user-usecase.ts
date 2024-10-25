import { generateToken } from "../../domain/services/generate-token-service";
import { LoginGateway } from "../../domain/user/gateway/gateway-login";
import { Usecase } from "../usecase";

export type LoginUserInputDto = {
  User_Email: string;
  User_Password: string;
};

export type LoginUserOutputDto = {
  User_Token: string;
  success: boolean;
};

export class LoginUserUsecase implements Usecase<LoginUserInputDto, LoginUserOutputDto> {
  private constructor(private loginUserGateway: LoginGateway) {};

  public static create(loginUserGateway: LoginGateway) {
    return new LoginUserUsecase(loginUserGateway);
  };

  public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
    try{
      const { User_Email, User_Password } = input
      const user = await this.loginUserGateway.findUser(User_Email);
      if(!user) throw new Error('user not found');
  
      await this.loginUserGateway.loginUser(user, User_Password);
      const userToken = await generateToken(user.User_Id);
      const output = this.presentOutput(userToken);
      return output;
    }catch(err){
      if (err instanceof Error){
        if(err.message === 'incorrect password') {
          throw new Error('incorrect password');
        }
        throw err;
      };
    }; 
    throw new Error('an unknown error occurred');
  };

  private presentOutput(userToken: string): LoginUserOutputDto {
    const present: LoginUserOutputDto = {
      User_Token: userToken,
      success: true,
    }
    return present;
  };
};