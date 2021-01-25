import { Application } from 'express';
import clientRegisterRouter from './user/clientRegister';
import userLoginRouter from './user/login';
import userLogoutRouter from './user/logout';
import userDeleteRouter from './user/delete';
import userEditRouter from './user/edit';

const setupRoutes = async (app: Application): Promise<void> => {
  app.use(
    '/api/users',
    clientRegisterRouter,
    userLoginRouter,
    userLogoutRouter,
    userDeleteRouter,
    userEditRouter
  );
  //app.use("/api/threads");
};

export { setupRoutes };
