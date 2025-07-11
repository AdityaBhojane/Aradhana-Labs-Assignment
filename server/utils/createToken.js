import jwt from 'jsonwebtoken';

export const createUserToken = (data) => {
    const token = jwt.sign(
       data,process.env.JWT_SECRET,{ expiresIn: '24h' }
    );
    return token;
}