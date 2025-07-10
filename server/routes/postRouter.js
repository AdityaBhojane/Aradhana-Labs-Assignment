import { Router } from "express";
import { createPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controllers/postController.js";
import { validate } from "../middlewares/validate.js";


export const postRouter = Router();

postRouter.post('/', validate, createPostController);
postRouter.get('/:postId', validate,  getPostByIdController);
postRouter.get('/', validate, getAllPostsController);
postRouter.put('/:postId', validate, updatePostController);
postRouter.delete('/:postId', validate, deletePostController);

