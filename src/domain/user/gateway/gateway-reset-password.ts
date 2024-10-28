import { UserProps } from "../entity/entity-user";

export interface UpdatePasswordGateway {
  findUserById(userId: string): Promise<UserProps | null>;
  updatePassword(user: UserProps): Promise<void>;
};