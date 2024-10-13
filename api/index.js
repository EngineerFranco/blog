import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/test', (req, res)=>{
    try {
        res.status(200).json({
            data: [],
            message: 'Api is working!',
            success: true,
            error: false
        })
    } catch (error) {
        res.status(error.status).json({
            data: [],
            message: 'Something went wrong',
            success: false,
            error: true
        })
    }
   
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

mongoose.connect(process.env.DB_URI).then(
    () => {console.log('Database is connected'),
        app.listen(3000, () =>{
            console.log('Server is listening to port 3000')
        })
    }
).catch(err =>{
    console.log(err)
})





