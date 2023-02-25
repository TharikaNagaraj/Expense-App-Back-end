const mongoose = require("mongoose")
const Category =  require("./categoryModel")
const User = require("../models/userModel")

const Schema = mongoose.Schema
const expenseSchema = new Schema({
    category:{
        type:String,
        required:true
    },
    item : {
        type:String,
        required:true
    },
    amount : {
        type:Number,
        required:true
    },
    expenseDate : {
        type:Date,
        // required:true
    },
    createdAt : {
        type:Date,
        default:new Date()
    },
    isArchived : {
        type:Boolean,
        default:false
    },
    isDeleted : {
        type:Boolean,
        default:false
    },
    isGraded : {
        type:Boolean,
        default:false
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"    
    },
    budgetId : {
        type : mongoose.Types.ObjectId,
        ref : "Budget"
    }
})

const Expense = mongoose.model("Expense",expenseSchema)

module.exports = Expense