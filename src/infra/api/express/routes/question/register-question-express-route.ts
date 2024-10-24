import { NextFunction, Request, Response } from "express";
import { RegisterQuestionInputDto, RegisterQuestionUsecase } from "../../../../../usecases/question/register-question-usecase";
import { HttpMethod, Route } from "../routes";
import { authMiddleware } from "../../../../../middlewares/auth/auth.middlewares";

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
      '/question-register',
      HttpMethod.POST,
      registerQustionService
    );
  };

  private async middlwareValidate(req: Request, res: Response, next: NextFunction) {
    await authMiddleware(req, res, next);
  };

  public getHandler() {
    return [
      this.middlwareValidate,
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const {
            Question_Difficulty, 
            Question_Statement, 
            Question_Figure, 
            Question_Text_Body, 
            Question_Resolution, 
            Question_Gabarito, 
            choices,
          } = req.body;

          const Question_Id_User_Internal = req.userId;

          if(!Question_Id_User_Internal) throw new Error('where are you req.userId?');

          const input: RegisterQuestionInputDto = {
            Question_Difficulty, 
            Question_Statement, 
            Question_Figure, 
            Question_Text_Body, 
            Question_Resolution, 
            Question_Gabarito, 
            Question_Id_User_Internal, 
            choices,
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