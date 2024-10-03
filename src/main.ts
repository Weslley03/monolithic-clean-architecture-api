import { FindUserByIdUserRoute } from "./infra/api/express/routes/user/finduserbyid-user-express-route";
import { RegisterUserRoute } from "./infra/api/express/routes/user/register-user-express-route";
import { UserRepositoryPrisma } from "./infra/repositories/user/prisma/user-prisma-repository";
import { UpdateUserRoute } from "./infra/api/express/routes/user/update-user-express-route";
import { DeleteUserRoute } from "./infra/api/express/routes/user/delete-user-express-route";
import { FindUserByIdUsecase } from "./usecases/user/finduserbyid-user-usecase";
import { RegisterUserUsecase } from "./usecases/user/register-user-usecase";
import { DeleteUserUsecase } from "./usecases/user/delete-user-usecase";
import { UpdateUserUsecase } from "./usecases/user/update-user-usecase";
import { ApiExpress } from "./infra/api/express/api.express";
import { prisma } from "./package/prisma/prisma";
import { LoginUserRepositoryPrisma } from "./infra/repositories/auth/prisma/login-prisma-repository";
import { LoginUserUsecase } from "./usecases/auth/login-user-usecase";
import { LoginUserRoute } from "./infra/api/express/routes/login/login-user-express-route";


function main() {
  const aRepository = UserRepositoryPrisma.create(prisma);  

  const registerUserUsecase = RegisterUserUsecase.create(aRepository);
  const updateUserUsecase = UpdateUserUsecase.create(aRepository);
  const findByIdUserUsecase = FindUserByIdUsecase.create(aRepository);
  const deleteUserUsecase = DeleteUserUsecase.create(aRepository);

  const registerUserRoute = RegisterUserRoute.create(registerUserUsecase);
  const updateUserRoute = UpdateUserRoute.create(updateUserUsecase);
  const findByIdUserRoute = FindUserByIdUserRoute.create(findByIdUserUsecase);
  const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);

  const bRepository = LoginUserRepositoryPrisma.create(prisma);

  const loginUserUsecase = LoginUserUsecase.create(bRepository);

  const loginUserRoute = LoginUserRoute.create(loginUserUsecase);

  const api = ApiExpress.create([registerUserRoute, updateUserRoute, findByIdUserRoute, deleteUserRoute, loginUserRoute]);

  const port = 8000;
  api.start(port);
};

main();