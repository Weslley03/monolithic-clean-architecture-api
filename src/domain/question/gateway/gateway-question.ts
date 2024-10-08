import { ChoiceProps } from "../../choices/entity/entity-choice";
import { UserProps } from "../../user/entity/entity-user";
import { Question } from "../entity/entity-question";

export interface QuestionGateway {
  registerQuestion(question: Question): Promise<void>;
  registerChoice(choices: ChoiceProps[]): Promise<void>;
  findUser(Question_Id_User_Internal: string): Promise<UserProps | null>;
};