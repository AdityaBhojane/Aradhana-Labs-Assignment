import { createCrudRepository } from "./crudRepository.js";
import  likeModel  from "../models/like.js";

export const likeRepository = {
    ...createCrudRepository(likeModel),
}