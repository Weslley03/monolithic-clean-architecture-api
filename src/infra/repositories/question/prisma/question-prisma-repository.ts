import { PrismaClient } from "@prisma/client";
import { QuestionGateway } from "../../../../domain/question/gateway/gateway-question";
import { Question } from "../../../../domain/question/entity/entity-question";
import { UserProps } from "../../../../domain/user/entity/entity-user";
import { ChoiceProps } from "../../../../domain/choices/entity/entity-choice";

export class QuestionRepositoryPrisma implements QuestionGateway {
  private constructor(private prismaClient: PrismaClient) {};

  public static create(prismaClient: PrismaClient) {
    return new QuestionRepositoryPrisma(prismaClient);
  }; 
  
  public async registerQuestion(question: Question): Promise<void> {
    const data = {
      Question_Id: question.Question_Id,
      Question_Category: question.Question_Category,
      Question_Difficulty: question.Question_Difficulty, 
      Question_Is_Approved: question.Question_Is_Approved,
      Question_Approved_Count: question.Question_Approved_Count,
      Question_Statement: question.Question_Statement, 
      Question_Figure: question.Question_Figure, 
      Question_Text_Body: question.Question_Text_Body, 
      Question_Resolution: question.Question_Resolution, 
      Question_Gabarito: question.Question_Gabarito, 
      Question_Id_User_Internal: question.Question_Id_User_Internal, 
      Question_Name_User_Internal: question.Question_Name_User_Internal,
      Question_Register_Date: question.Question_Register_Date,
      Question_Publication_Date: question.Question_Publication_Date,
      Question_Reviewed_Date: question.Question_Reviewed_Date,
      Question_Update_Date: question.Question_Update_Date,
      Question_Total_Use: question.Question_Total_Use,
    };

    await this.prismaClient.question.create({data});
  };

  public async registerChoice(choices: ChoiceProps[]): Promise<void> {
    await this.prismaClient.choices.createMany({
      data: choices
    });
  };

  public async findUser(Question_Id_User_Internal: string): Promise<UserProps | null>{
    const userData = await this.prismaClient.user.findUnique({
      where: { User_Id: Question_Id_User_Internal },
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