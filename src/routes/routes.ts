import { Application } from "express";
import { Request, Router } from "express";
import callbackRouter from "./auth/callback";
import loginRouter from "./auth/login";
import logoutRouter from "./auth/logout";

const router = Router();

const setupRoutes = async (app: Application): Promise<void> => {
  app.use(
    router.get("/", (req: Request, res) => {
      console.log(req.user);
      return res.send({ isLoggedIn: req.user ? true : false });
    })
  );

  app.use("/", loginRouter, callbackRouter, logoutRouter);
};

export { setupRoutes };
