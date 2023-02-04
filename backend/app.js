import cors from 'cors'
import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
// import path from 'path'
import userRoutes from './routes/users.js'
import saucesRoutes from './routes/sauces.js'


dotenv.config()
const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);

await mongoose.connect(process.env.MONGO_URL)

app.use(cors())


app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes)
app.use('/images', express.static('images'))

app.listen(3000)





// import {router} from './'