import cors from 'cors'
import dotenv from 'dotenv'

// const express = require('express');
import express from "express"

// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import userRoutes from './routes/users.js'
// const userRoutes = require('./routes/users');
import saucesRoutes from './routes/sauces.js'

// const saucesRoutes = require('./routes/sauces')
dotenv.config()
const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);

await mongoose.connect(process.env.MONGO_URL)

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });
app.use(cors())


app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes)
app.listen(3000)


export default app