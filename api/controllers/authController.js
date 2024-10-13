import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        // Validations
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'All fields are required'))
        }

        // Hash the password
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // Try to save the new user
        try {
            await newUser.save();
            return res.status(201).json({
                statusCode: 201,
                message: 'User successfully created',
                success: true,
            });
        } catch (error) {
            next(error)
        }
       
    } catch (error) {
        next(error)
    }
};
