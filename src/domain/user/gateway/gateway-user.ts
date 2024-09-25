import { User, UserProps } from "../entity/entity-user";

export interface UserGateway {
  registerUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  findUserById(userId: string): Promise<UserProps | null>;
  deleteUser(userId: string): Promise<void>;
};