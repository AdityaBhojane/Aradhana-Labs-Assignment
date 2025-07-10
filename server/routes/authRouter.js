import { Router } from "express";
import { signinController, signupController } from "../controllers/authController.js";



export const authRouter = Router();

authRouter.post('/register', signupController);
authRouter.post('/login', signinController);