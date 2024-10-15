import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import postRouter from './routes/postRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/test', (req, res)=>{
    try {
        res.status(200).json({
            message: 'Api is working!',
            success: true,
            error: false
        })
    } catch (error) {
        res.status(error.status).json({
            message: 'Something went wrong',
            success: false,
            error: true
        })
    }
   
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        statusCode,
        message,
        success: false
    })
})

mongoose.connect(process.env.DB_URI).then(
    () => {console.log('Database is connected'),
        app.listen(3000, () =>{
            console.log('Server is listening to port 3000')
        })
    }
).catch(err =>{
    console.log(err)
})





