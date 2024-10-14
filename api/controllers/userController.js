import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js'

export const test = (req, res) => {
    res.json({
        message: 'user endpoint and controller is working'
    })
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,'You are not allowed to update this user'))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'Password must be atleast 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20 ){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
              errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
        console.log('test')
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password
                },

            },
            {
                new:true
            })
       
            const {password, ...rest} = updatedUser._doc
            const responseDate = {
                data: rest,
                statusCode: 200,
                message: 'Successfully update user',
                success: true,
            }
            res.status(200).json(responseDate)
        } catch (error) {
            next(error)
        }
    }
}