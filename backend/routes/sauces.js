import auth from '../middleware/auth'
import express from "express"
import Sauce from '../models/sauce'

const router = express.Router()
// const Sauce = require('../models/sauce');
// const auth = require('../middleware/auth');



router.post('/', auth, (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

router.put('/:id', auth, (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', auth, (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

router.get('/:id', auth, (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(normalizer(sauce,req)))
        .catch(error => res.status(404).json({ error }));
});

router.get('/', auth, (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces.map(sauce=> normalizer(sauce,req))))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;

function normalizer(sauce,req){
    return {
        ...sauce.toObject(),
        likes:sauce.usersLiked.length,
        dislikes:sauce.usersDisliked.length,
        imageUrl: req.protocol + '://' + req.get('host') + '/images/' + sauce.imageName

    }
}