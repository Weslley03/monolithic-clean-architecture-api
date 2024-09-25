import { User } from "../entity/entity-user";

export interface UserGateway {
  registerUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  findUserById(userId: string): Promise<User | null>;
  deleteUser(userId: string): Promise<void>;
};