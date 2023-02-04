import auth from '../middleware/auth.js'
import express from "express"
import fs from 'fs'
import multer from '../middleware/multer-config.js'
import Sauce from '../models/sauce.js'

const router = express.Router()





router.post('/', auth, multer, (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject.id
    delete sauceObject.userId
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageName: req.file.filename
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }))
})




router.put('/:id', auth, multer, async (req, res, next) => {
    try {
        const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageName: req.file.filename
        } : { ...req.body };

        delete sauceObject.userId;
        const sauce = await Sauce.findOne({ id: req.params.id })
        if (sauce.userId != req.auth.userId) {
            if (req.file) {
                fs.unlinkSync(`images/${req.file.filename}`)
            }
            return res.status(401).json({ message: 'Non autorisé' })
        }
        if (req.file) {
            fs.unlinkSync(`images/${sauce.imageName}`)
        }
        await Sauce.updateOne({ id: req.params.id }, { ...sauceObject, id: req.params.id })
        res.status(200).json({ message: 'Objet modifié!' })
    }

    catch (error) {
        res.status(400).json({ error })
    }
})


router.delete('/:id', auth, async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ id: req.params.id })

        if (sauce.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Non authorisé' })
        }
        fs.unlinkSync(`images/${sauce.imageName}`)
        await Sauce.deleteOne({ id: req.params.id })
        res.status(200).json({ message: 'Objet supprimé !' })
    }

    catch (error) {
        res.status(500).json({ error })
    }
})




router.get('/:id', auth, async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ id: req.params.id })
        res.status(200).json(normalizer(sauce, req))
    }

    catch (error) { res.status(404).json({ error }) }
})

router.get('/', auth, (req, res, next) => {
    try {
        const sauces = await Sauce.find()
        res.status(200).json(sauces.map(sauce => normalizer(sauce, req)))
    }

    catch (error) {res.status(400).json({ error })}
})

router.post('/:id/like', auth, (res, res, next) => {
    
})

function normalizer(sauce, req) {
    return {
        ...sauce.toObject(),
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length,
        imageUrl: req.protocol + '://' + req.get('host') + '/images/' + sauce.imageName
    }
}

export default router