import { UserProps } from "../entity/entity-user";

export interface LoginGateway {
  loginUser(user: UserProps, password: string): Promise<void>;
  findUser(userEmail: string): Promise<UserProps | null>;  
};