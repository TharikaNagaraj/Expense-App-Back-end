const Budget = require("../models/budgetModel")

const budgetMiddleware  = (req,res,next) => 
{
    console.log(req.user)
    Budget.find({"userId" : req.user._id,"isArchived" : false,"isDeleted" : false})
        .then((budget) => 
        {
            // console.log('budget',budget)
            const budgetData = {
                budgetId : ""
            }
            budget.forEach((ele) => 
            {
                budgetData.budgetId = ele._id
            })
            req.budgetData = budgetData
            // console.log(req.budgetData)
            next()
        })
        .catch((err) => 
        {
            res.json(err)
        })
    
}

module.exports = budgetMiddleware