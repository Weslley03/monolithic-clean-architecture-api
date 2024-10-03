import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { UserGateway } from "../../../../domain/user/gateway/gateway-user";
import { User, UserProps } from "../../../../domain/user/entity/entity-user";

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private prismaClient: PrismaClient) {};

  public static create(prismaClient: PrismaClient){
    return new UserRepositoryPrisma(prismaClient);
  }

  private async hashPassword(password: string): Promise<string>{
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);  
    return hashedPassword;
  };

  public async registerUser(user: User): Promise<void> {
    const existingUser = await this.prismaClient.user.findUnique({ where: { User_Email: user.User_Email } }); 
    if(existingUser) throw new Error('email already in use');

    const User_PasswordHasshed = await this.hashPassword(user.User_Password);
    
    const data = {
      User_Id: user.User_Id ,
      User_Name: user.User_Name,
      User_Email: user.User_Email,
      User_Password: User_PasswordHasshed,
      User_Username: user.User_Username,
      User_Avatar: user.User_Avatar,
      User_Overall_Rating: user.User_Overall_Rating,
      User_Questions_Answers: user.User_Questions_Answers,
      User_Points_Earned: user.User_Points_Earned,
      User_Total_Question_Add: user.User_Total_Question_Add,
      User_Register_Date: user.User_Register_Date,
    };
    
    await this.prismaClient.user.create({data});
  };

  public async updateUser(user: User): Promise<void> {
    const data: Partial<UserProps> = {};

    if (user.User_Name) data.User_Name = user.User_Name;
    if (user.User_Username) data.User_Username = user.User_Username;
    if (user.User_Avatar) data.User_Avatar = user.User_Avatar;

    await this.prismaClient.user.update({
      where: { User_Id: user.User_Id },
      data,
    })
  };

  public async findUserById(userId: string): Promise<UserProps | null> {
    const userData = await this.prismaClient.user.findUnique({
      where: { User_Id: userId },
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

  public async deleteUser(userId: string): Promise<void> {
    try{
      await this.prismaClient.user.delete({
        where: { User_Id: userId }
      }); 
    }catch(err){
      throw new Error('user not found');
    };
  };
};