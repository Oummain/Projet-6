import dotenv from 'dotenv'

// const express = require('express');
import express from "express"

// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import userRoutes from './routes/users'
// const userRoutes = require('./routes/users');
import saucesRoutes from './routes/sauces'

// const saucesRoutes = require('./routes/sauces')
dotenv.config()
const app = express();
app.use(express.json());



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
module.exports = app;