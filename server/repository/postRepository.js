import { createCrudRepository } from "./crudRepository.js";
import  PostModel  from "../models/post.js";
export const postRepository = {
    ...createCrudRepository(PostModel),
    getPaginatedPosts: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        return await PostModel.find().skip(skip).limit(limit);
    }
}