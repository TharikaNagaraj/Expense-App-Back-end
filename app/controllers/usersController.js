const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const usersController = {}

usersController.register = (req,res) => 
{
    const body = req.body
    const user = new User(body)
    bcrypt.genSalt()
        .then((salt) => 
        {
            bcrypt.hash(user.password,salt)
                .then((hashedPassword) => 
                {
                    user.password = hashedPassword
                    user.save()
                        .then((user) => 
                        {
                            res.json(user)
                        })
                        .catch((err) => 
                        {
                            res.json(err)
                        })
                })
        })
    // User.exists({email:user.email},function(err,result)
    // {
    //     if(result)
    //     {
    //         console.log('result',result)
    //     }
    //     else 
    //     {
    //         bcrypt.genSalt()
    //             .then((salt) =>
    //             {
    //                 bcrypt.hash(user.password,salt)
    //                     .then((encryptedPassword) => 
    //                     {
    //                         user.password = encryptedPassword
    //                         user.save()
    //                             .then((user) => 
    //                             {
    //                                 res.json(user)
    //                             })
    //                             .catch((err) => 
    //                             {
    //                                 res.json(err)
    //                             })
    //                     })
    //             })
    //     }
    // })
}
usersController.update = (req,res) => 
{
    const body = req.body
    const id = req.user._id
    // console.log('body',body)
    // console.log('req.file',req.file)
    // console.log('req.user',req.user)
    if(req.file == undefined)
    {
        User.findByIdAndUpdate(id,body,{new:true})
        .then((user) => 
        {
           res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        }) 
    }
    else
    {
        const url = req.protocol + "://" + req.get('host')
        body.photo = url + "/uploads/" + req.file.filename
        // console.log('body',body)
        User.findByIdAndUpdate(id,body,{new:true})
        .then((user) => 
        {
            // console.log(user)
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        }) 
    }  
}

usersController.login = (req,res) => 
{
    const body = req.body
    User.findOne({"email":body.email})
        .then((user) => 
        {
            if(!user)
            {
                res.json("Invalid email or password")
            }
            else
            {
                bcrypt.compare(body.password,user.password)
                    .then((match) => 
                    {
                        if(!(match))
                        {
                            res.json("invalid email or password")
                        }
                        else
                        {
                            const data = {
                                id:user._id,
                                email:user.email
                            }
                            const token = jwt.sign(data,'expense333',{expiresIn:"1d"})
                            res.json({
                                "token":`Bearer ${token}`
                            })
                        }
                    })
            }
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

usersController.list = (req,res) => 
{
    User.find()
        .then((users) => 
        {
            res.json(users)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
usersController.show = (req,res) => 
{
    res.json(req.user)
}

usersController.destroy = (req,res) => 
{
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

module.exports = usersController