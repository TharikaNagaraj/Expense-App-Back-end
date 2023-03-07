const jwt = require("jsonwebtoken")
const User = require("../../app/models/userModel")
// const multer = require('multer')

const authenticateUser = (req,res,next) => 
{
    const token = req.header('Authorization').split(" ")[1]
    console.log('token',token)
    let tokenData
    try{ 
        tokenData = jwt.verify(token,"expense333")
        //console.log('tokendata',tokenData)
        User.findById(tokenData.id) 
            .then((user) => 
            {
                req.user = user
                // console.log('user',user)
                next()
            })
            .catch((err) => 
            {
                res.json(err)
            })

    }catch(e)
    {
        res.json(e.message)
    }
}

// const imageUpload = (req,res,next) => 
// {
//     const upload = multer({dest : "uploads/"})
//     next()
// }

module.exports = {
    authenticateUser
    // imageUpload
}