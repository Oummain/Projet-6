import bcrypt from 'bcrypt'
import express from "express"
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
const router = express.Router()
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save()
        res.status(201).json({ message: 'Utilisateur créé !' })


    } catch (error) {
        console.error(error)
        res.status(500).json({ error });
    }




})



router.post('/login', async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
        }
        const valid = await bcrypt.compare(req.body.password, user.password)

        if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' })
        })
    }

    catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

export default router