import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        console.log("Sign Up Request body: ", req.body)

        // Validations
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return next(errorHandler(400, 'All fields are required'))
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

export const signin = async (req, res, next) =>{
    try {
        const { email, password } = req.body;
        console.log("Sign In Request body: ", req.body)

        // Validations
        if (!email || !password || email === '' || password === '') {
            next(errorHandler(400, 'All fields are required'))
        }

        // Try to signin the user
        try {

            const validUser = await User.findOne({email})
            if(!validUser){
                return next(errorHandler(404 , 'User not found'))
            }

            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if(!validPassword){
                return next(errorHandler(400, 'Invalid email or password'))
            }

            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

            const {password: pass, ...rest} = validUser._doc
            const responseData = {
                data: rest,
                statusCode: 200,
                message: 'User successfully sign in',
                success: true,
            }
            res.status(200).cookie('access_token', token,{
                httpOnly:true}).json(responseData)


        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
   
}
