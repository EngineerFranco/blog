import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation: Check if any required field is missing
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({
                data: [],
                message: 'All fields are required',
                success: false,
                error: true
            });
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
                data: [],
                message: 'User successfully created',
                success: true,
                error: false
            });
        } catch (error) {
            return res.status(502).json({
                data: [],
                message: error.message || error,
                success: false,
                error: true
            });
        }
       
    } catch (error) {
        // Catch any other unexpected errors and return a response
        return res.status(500).json({
            data: [],
            message: 'Something went wrong',
            success: false,
            error: true
        });
    }
};
