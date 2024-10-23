import { QuestionProps } from "../../domain/question/entity/entity-question";
import { QuestionGateway } from "../../domain/question/gateway/gateway-question";
import { Usecase } from "../usecase";

export type FindAllQuestionInputDto = void;

export type FindAllQuestionOutputDto = {
  QuestionProps: QuestionProps[]
};

export class FindAllQuestionUsecase implements Usecase<FindAllQuestionInputDto, FindAllQuestionOutputDto> {
  private constructor(private readonly questionGateway: QuestionGateway) {};

  public static create(questionGateway: QuestionGateway) {
    return new FindAllQuestionUsecase(questionGateway);
  };

  public async execute(input: FindAllQuestionInputDto): Promise<FindAllQuestionOutputDto>{
    const questions = await this.questionGateway.findAllQuestion();
    return {
      QuestionProps: questions,
    };
  };
};