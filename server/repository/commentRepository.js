import { createCrudRepository } from "./crudRepository.js";
import  CommentModel  from "../models/comment.js";

export const commentRepository = {
    ...createCrudRepository(CommentModel),
    getAllComments: async (postId) => {
        return await CommentModel.find({ postId }).populate('userId');
    }
}