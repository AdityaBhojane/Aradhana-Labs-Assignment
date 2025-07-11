import { Router } from "express";
import { createPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controllers/postController.js";
import { validate } from "../middlewares/validate.js";
import { uploader } from "../config/cloudinary.js";


export const postRouter = Router();

postRouter.post('/', validate, uploader.single('image'), createPostController);
postRouter.get('/:postId', validate,  getPostByIdController);
postRouter.get('/', getAllPostsController);
postRouter.put('/:postId', validate, uploader.single('image'), updatePostController);
postRouter.delete('/:postId', validate, deletePostController);

