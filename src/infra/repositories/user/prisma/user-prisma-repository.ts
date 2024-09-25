import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../../domain/user/gateway/gateway-user";
import { User, UserProps } from "../../../../domain/user/entity/entity-user";

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private prismaClient: PrismaClient) {};

  public static create(prismaClient: PrismaClient){
    return new UserRepositoryPrisma(prismaClient);
  }

  public async registerUser(user: User): Promise<void> {
    const data = {
      User_Id: user.User_Id ,
      User_Name: user.User_Name,
      User_Email: user.User_Email,
      User_Password: user.User_Password,
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

  public async findUserById(userId: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { User_Id: userId },
    });
    if(!user) return null
    const result = User.create(
      user.User_Name,
      user.User_Email,
      user.User_Password,
      user.User_Username,
    )
    return result;
  };

  public async deleteUser(userId: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { User_Id: userId }
    }); 
  };
};