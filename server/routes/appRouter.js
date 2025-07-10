import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { commentRouter } from "./commentRouter.js";
import { likeRouter } from "./likeRouter.js";
import { authRouter } from "./authRouter.js";


export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/posts", postRouter);
appRouter.use("/comments", commentRouter);
appRouter.use("/likes", likeRouter);