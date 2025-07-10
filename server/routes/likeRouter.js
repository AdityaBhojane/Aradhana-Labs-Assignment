import { Router } from "express";
import { addLikeController, getLikesController, removeLikeController } from "../controllers/likeController.js";
import { validate } from "../middlewares/validate.js";


export const likeRouter = Router();

likeRouter.post('/', validate, addLikeController);
likeRouter.get('/:postId', validate, getLikesController);
likeRouter.delete('/:likeId', validate, removeLikeController);
