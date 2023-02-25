const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("./userModel")

const budgetSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"       
    },
    Amount : {
        type : Number
    },
    isArchived : {
        type : Boolean,
        default : false
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Budget = mongoose.model("Budget",budgetSchema)

module.exports = Budget

