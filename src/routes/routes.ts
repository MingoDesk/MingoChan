import { Application } from "express";
import clientRegisterRouter from "./user/clientRegister";
import userLoginRouter from "./user/login";
import userLogoutRouter from "./user/logout";

const setupRoutes = async (app: Application): Promise<void> => {
  app.use("/api/users", clientRegisterRouter, userLoginRouter, userLogoutRouter);
  //app.use("/api/threads");
};

export { setupRoutes };
