import { QuestionGateway } from "../../domain/user/gateway/gateway-question";
import { Question } from "../../domain/user/question/entity-question";
import { Usecase } from "../usecase";

export type RegisterQuestionInputDto = {
  Question_Difficulty: number, 
  Question_Statement: string, 
  Question_Figure: string, 
  Question_Text_Body: string, 
  Question_Resolution: string, 
  Question_Gabarito: string, 
  Question_Id_User_Internal: string, 
  Question_Name_User_Internal: string
};

export type RegisterQuestionOutputDto = {
  Question_Id?: string;
};

export class RegisterQuestionUsecase implements Usecase<RegisterQuestionInputDto, RegisterQuestionOutputDto> {
  private constructor(private readonly questionGateway: QuestionGateway) {};

  public static create(questionGateway: QuestionGateway) {
    return new RegisterQuestionUsecase(questionGateway);
  }; 

  public async execute(input: RegisterQuestionInputDto): Promise<RegisterQuestionOutputDto> {
    const {
      Question_Difficulty,
      Question_Statement, 
      Question_Figure, 
      Question_Text_Body, 
      Question_Resolution, 
      Question_Gabarito, 
      Question_Id_User_Internal, 
      Question_Name_User_Internal,
    } = input;

    const aQuestion =  Question.create(
      Question_Difficulty,
      Question_Statement, 
      Question_Figure, 
      Question_Text_Body, 
      Question_Resolution, 
      Question_Gabarito, 
      Question_Id_User_Internal, 
      Question_Name_User_Internal,
    );
    
  };
};