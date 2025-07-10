import jwt from 'jsonwebtoken';

export const validate = (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error in validate middleware:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}