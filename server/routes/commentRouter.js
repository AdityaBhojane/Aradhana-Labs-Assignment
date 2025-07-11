import { Router } from "express";
import { addCommentController, deleteCommentController, getCommentsByPostIdController } from "../controllers/commentController.js";
import { validate } from "../middlewares/validate.js";



export const commentRouter = Router();  

commentRouter.post('/:postId', validate, addCommentController);
commentRouter.get('/:postId', validate, getCommentsByPostIdController);
commentRouter.delete('/:commentId/:postId', validate, deleteCommentController);

