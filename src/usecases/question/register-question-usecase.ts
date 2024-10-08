import { QuestionGateway } from "../../domain/question/gateway/gateway-question";
import { Question } from "../../domain/question/entity/entity-question";
import { Usecase } from "../usecase";
import { Choice, ChoiceProps } from "../../domain/choices/entity/entity-choice";

export type RegisterQuestionInputDto = {
  Question_Difficulty: number, 
  Question_Statement: string, 
  Question_Figure: string, 
  Question_Text_Body: string, 
  Question_Resolution: string, 
  Question_Gabarito: string, 
  Question_Id_User_Internal: string, 
  Question_Name_User_Internal?: string,
  choices: ChoiceProps[],
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
      choices,
    } = input;

    const user = await this.questionGateway.findUser(Question_Id_User_Internal);
    if(!user) throw new Error('it was not possible to find the creator of this question');
    const Question_Name_User_Internal = user.User_Name

    const aQuestion = Question.create(
      Question_Difficulty,
      Question_Statement, 
      Question_Figure, 
      Question_Text_Body, 
      Question_Resolution, 
      Question_Gabarito, 
      Question_Id_User_Internal, 
      Question_Name_User_Internal,
    );

    await this.questionGateway.registerQuestion(aQuestion);

    const questionChoices = choices.map(choice =>
      Choice.create(
        aQuestion.Question_Id,
        choice.Choice_Text,
        choice.Question_Choice_Is_Correct
      ).getProps()
    );

    await this.questionGateway.registerChoice(questionChoices);

    const output: RegisterQuestionOutputDto = this.presentOutput(aQuestion);
    return output;
  };

  private presentOutput(question: Question): RegisterQuestionOutputDto {
    const present: RegisterQuestionOutputDto = {
      Question_Id: question.Question_Id
    }
    return present;
  };
};