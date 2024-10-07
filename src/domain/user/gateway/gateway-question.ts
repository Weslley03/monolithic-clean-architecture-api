import { Question } from "../question/entity-question";

export interface QuestionGateway {
  registerQuestion(question: Question): Promise<void>;
};