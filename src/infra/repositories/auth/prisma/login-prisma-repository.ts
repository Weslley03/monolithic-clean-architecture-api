import { PrismaClient } from "@prisma/client";
import { UserProps } from "../../../../domain/user/entity/entity-user";
import { LoginGateway } from "../../../../domain/user/gateway/gateway-login";
import { compare } from 'bcrypt';

export class LoginUserRepositoryPrisma implements LoginGateway {
  private constructor(private prismaClient: PrismaClient) {};

  public static create(prismaClient: PrismaClient) {
    return new LoginUserRepositoryPrisma(prismaClient); 
  };

  private async verifyPassword(passwordSimple: string, hashedPassword: string): Promise<boolean>{
    const isMatch = await compare(passwordSimple, hashedPassword);
    return isMatch;
  };

  public async loginUser(user: UserProps, password: string): Promise<void> {
    const correctPassword = user.User_Password;
    const passwordSimple = password;
    const isMatch = await this.verifyPassword(passwordSimple, correctPassword);
    if(!isMatch) throw new Error('incorrect password');
  };

  public async findUser(userEmail: string): Promise<UserProps | null>{
    const userData = await this.prismaClient.user.findUnique({
      where: { User_Email: userEmail },
    });
    if(!userData) return null
    return {
      User_Id: userData.User_Id,
      User_Name: userData.User_Name,
      User_Email: userData.User_Email,
      User_Password: userData.User_Password,
      User_Username: userData.User_Username,
      User_Avatar: userData.User_Avatar,
      User_Overall_Rating: userData.User_Overall_Rating,
      User_Questions_Answers: userData.User_Questions_Answers,
      User_Points_Earned: userData.User_Points_Earned,
      User_Total_Question_Add: userData.User_Total_Question_Add,
      User_Register_Date: userData.User_Register_Date,
    };
  };
};