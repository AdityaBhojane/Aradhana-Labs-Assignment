import { authService } from "../services/authService.js";


export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }
        const response = await authService.signup({username, email, password});
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error in signupController:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
};

export const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const response = await authService.signin(email, password);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in signinController:", error);
        return res.status(500).json({ message: "Failed to sign in" });
    }
}