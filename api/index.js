import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

mongoose.connect(process.env.DB_URI).then(
    () => {console.log('Database is connected'),
        app.listen(3000, () =>{
            console.log('Server is listening to port 3000')
        })
    }
).catch(err =>{
    console.log(err)
})




