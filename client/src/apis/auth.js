import { axiosInstance } from "../config/axiosConfig.js";


export const signup = async ({email, password, username}) => {
    try {
        const response = await axiosInstance.post("/auth/signup", {
            email,
            password,
            username
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error during signup:", error);
        throw new Error("Failed to create account. Please try again.");  
    }
};

export const signin = async ({email, password}) => {
    try {
        const response = await axiosInstance.post("/auth/signin", {
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error during signin:", error);
        throw new Error("Invalid email or password.");
    }
}