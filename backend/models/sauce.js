import mongoose from 'mongoose'

const sauceSchema = new mongoose.Schema({
   
    userId:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    manufacturer:{type:String, required:true},
    description:{type:String, required:true},
    mainPepper:{type:String, required:true},
    imageName:{type:String, required:true},
    heat:{type:Number, required:true},
    usersLiked:{type:[String], required:true},
    usersDisliked:{type:[String], required:true},
    
})

export default mongoose.model('sauce', sauceSchema )