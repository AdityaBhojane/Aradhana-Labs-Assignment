import { createCrudRepository } from "./crudRepository.js";
import  UserModel  from "../models/user.js";

export const userRepository = {
    ...createCrudRepository(UserModel),
    findByEmail: async (email) => {
        return await UserModel.findOne({ email });
    }, 
    findUserById: async (id) => {
        return await UserModel.findById(id);
    },
}