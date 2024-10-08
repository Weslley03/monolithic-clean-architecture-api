import { UserProps } from "../entity/entity-user";
import { Question } from "../question/entity-question";

export interface QuestionGateway {
  registerQuestion(question: Question): Promise<void>;
  findUser(Question_Id_User_Internal: string): Promise<UserProps | null>;
};