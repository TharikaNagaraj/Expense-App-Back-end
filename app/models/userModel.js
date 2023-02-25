const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
// const isEmail = require("../../node_modules/validator/lib/isEmail")
// const isAlphanumeric = require("../../node_modules/validator/lib/isAlphanumeric")

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name required"]
    },
    occupation:{
        type:String
    },
    photo:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:true,
        validate:{
            validator:function(value)
            {
                return (validator.isEmail(value))
            },
            message:"Email not valid"
        }
    },
    password:{
        type:String,
        required:[true,"Password required"],
        minLength:8,
        maxLength:128
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User

//validations for email and password using validator