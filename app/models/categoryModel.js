const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("./userModel")

const categorySchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name : {
        type : String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category