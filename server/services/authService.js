import { userRepository } from "../repository/userRepository.js";
import { createUserToken } from "../utils/createToken.js";


export const authService = {
    signup:async(userData)=>{
        try {
            if(!userData.username || !userData.email || !userData.password) {
                throw new Error("all fields are required");
            }
            const response = await userRepository.create(userData);
            return response;
        } catch (error) {
            console.log("Error in authService.signup:", error);
            throw new Error("Failed to create user");
        }
    },
    signin:async(email, password)=>{
        try {
            if(!email || !password) {
                throw new Error("email and password are required");
            }
            const user = await userRepository.findByEmail(email);
            if(!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = await user.verifyPassword(password);
            if(!isPasswordValid) {
                throw new Error("Invalid password");
            }
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                token: createUserToken({userId: user.id, username: user.username, email: user.email})
            };
        } catch (error) {
            console.log("Error in authService.signin:", error);
            throw new Error("Failed to sign in");
        }
    }

}   