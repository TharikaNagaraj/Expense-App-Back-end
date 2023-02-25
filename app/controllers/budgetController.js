const Budget = require("../../app/models/budgetModel")
const Expense = require("../models/expenseModel")

const budgetController = {}
budgetController.create = (req,res) => 
{
    const body = req.body
    const id = req.user.id
    body.userId = id
    // console.log(body)
    const budget = new Budget(body)
    budget.save()
        .then((budget) => 
        {
            res.json(budget)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
budgetController.show = (req,res) => 
{
    const id = req.user.id
    Budget.find()
        .populate("userId")
        .then((budgets) => 
        {
            Budget.find({"userId":id,"isArchived" : false})
                .then((budget) => 
                {
                    // console.log(budget)
                    res.json(budget)
                })
                .catch((err) => 
                {
                    res.json(err)
                })
            
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

budgetController.list = (req,res) => 
{
    Budget.find()
        .then((budgets) => 
        {
            res.json(budgets)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

budgetController.archive = (req,res) => 
{
    const id = req.params.id
    Budget.findByIdAndUpdate(id,{"isArchived" : true},{new:true})
        .then((budget) =>
        {
            // console.log(budget)
            Expense.updateMany({"budgetId" : id},{"$set":{"isArchived":true}},function(err,result)
            {
                if(err)
                {
                    res.json(err)
                }
                else
                {
                   res.json(budget)
                }
            })
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

budgetController.showArchivedList = (req,res) => 
{
    const id = req.user.id
    // console.log(id)
    Budget.find({"isArchived" : true}).populate({path : "userId",match:{
        _id : id
    }})
        .then((budgets) => 
        {
            const result = budgets.filter((ele) => 
            {
                return (!(ele.userId === null))
            })
            // console.log(result)
            res.json(result)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

budgetController.destroy = (req,res) => 
{
    const id = req.params.id
    Expense.deleteMany({"budgetId" : id},function(err,result)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            // console.log(result)
            // console.log(result.acknowledged)
            if(result.acknowledged == true)
            {
                Budget.findByIdAndDelete(id)
                    .then((budget) => 
                    {
                        res.json(budget)
                    }) 
                    .catch((err) => 
                    {
                        res.json(err)
                    })
            }
        }
    })
   
}





module.exports = budgetController