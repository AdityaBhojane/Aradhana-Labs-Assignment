import { Router } from "express";
import { addLikeController, getLikesController, removeLikeController } from "../controllers/likeController.js";
import { validate } from "../middlewares/validate.js";


export const likeRouter = Router();

likeRouter.post('/:postId', validate, addLikeController);
likeRouter.get('/:postId', getLikesController);
likeRouter.delete('/:postId/:likeId', validate, removeLikeController);
