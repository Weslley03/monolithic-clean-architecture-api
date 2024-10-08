import { NextFunction, Request, Response } from "express";
import { RegisterQuestionInputDto, RegisterQuestionUsecase } from "../../../../../usecases/question/register-question-usecase";
import { HttpMethod, Route } from "../routes";

export type RegisterQuestionResponseDto = {
  Question_Id?: string;
};

export class RegisterQuestionRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly registerQustionService: RegisterQuestionUsecase,
  ) {};

  public static create(registerQustionService: RegisterQuestionUsecase){
    return new RegisterQuestionRoute(
      '/question-register/:Question_Id_User_Internal',
      HttpMethod.POST,
      registerQustionService
    );
  };

  public getHandler() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const {
            Question_Difficulty, 
            Question_Statement, 
            Question_Figure, 
            Question_Text_Body, 
            Question_Resolution, 
            Question_Gabarito, 
          } = req.body;

          const {
            Question_Id_User_Internal, 
          } = req.params;

          const input: RegisterQuestionInputDto = {
            Question_Difficulty, 
            Question_Statement, 
            Question_Figure, 
            Question_Text_Body, 
            Question_Resolution, 
            Question_Gabarito, 
            Question_Id_User_Internal, 
          };

          const output: RegisterQuestionResponseDto =  await this.registerQustionService.execute(input);
          const responseBody = this.presentOutput(output);
          res.status(201).json(responseBody).send();
        }catch(err){
          next(err);
        }
      }
    ]
  };

  private presentOutput(input: RegisterQuestionResponseDto): RegisterQuestionResponseDto {
    const response = { Question_Id: input.Question_Id };
    return response;
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
};