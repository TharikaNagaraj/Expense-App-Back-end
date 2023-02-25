const Expense = require("../models/expenseModel")
const Category = require("../models/categoryModel")
const Budget = require("../models/budgetModel")

const expenseController = {}

expenseController.create = (req,res) => 
{    
    const body = req.body
    const expense = new Expense(body)
    // expense.userId = req.userId 
    expense.save()
        .then((expense) => 
        {
            res.json(expense)
            // console.log('created',expense)
        })
        .catch((err) => 
        {
            res.json(err)
        })    
        
}
expenseController.list = (req,res) => 
{
    const budgetId = req.budgetData.budgetId
    console.log('BID',budgetId)
    Expense.find({"isDeleted" : false,"isArchived" : false,"budgetId" : budgetId})
        .then((expenses) => 
        {
            if(expenses.length > 0)
            {
                res.json(expenses)
            }
            else
            {
                res.json(
                    message = "no expenses found"
                )
            }
        })
        .catch((err) => 
        {
            res.json(err)
        })
    // const id = req.user.id
    // console.log(id)
    // Expense.find({"isDeleted" : false,"isArchived":false}).populate({path : "budgetId",match:{
    //     userId:id
    // }})
    //     .then((expenses) =>
    //     {
    //        const result = expenses.filter((ele) => 
    //        {
    //             return(!(ele.budgetId === null))
    //        }) 
    //        if(result.length > 0)
    //        {
    //             res.json(result)
    //        }    
    //        else
    //        {
    //             res.json(
    //                 message = "no expenses found"
    //             )
    //        }
    //     })
    //     .catch((err) => 
    //     {
    //         console.log(err)
    //     })       
}

expenseController.delete = (req,res) => 
{
    const id = req.params.id
    Expense.findByIdAndUpdate(id,{"isDeleted":true},{new:true})
        .then((expense) => 
        {
            res.json(expense)
        })
        .catch((err) =>     
        {
            res.json(err)
        })
}

expenseController.showAll = (req,res) => 
{
    Expense.find({"isDeleted" : false}).populate("budgetId")
        .then((expenses) => 
        {
            res.json(expenses)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

expenseController.show = (req,res) => 
{
    const id = req.params.id
    Expense.findById(id)
        .then((expense) => 
        {
            res.json(expense)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

expenseController.showArchivedList = (req,res) => 
{
    const id = req.params.id
    Expense.find({"isArchived":true}).populate({path:"budgetId",match:{_id:id}})
        .then((expenses) => 
        {
            const result = expenses.filter((ele) => 
            {
                return (!(ele.budgetId === null))
            })
            res.json(result)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

expenseController.update = (req,res) => 
{
    const body = req.body   
    const id = req.params.id
    Expense.findByIdAndUpdate(id,body,{new:true})
        .then((expense) => 
        {
            res.json(expense)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

expenseController.destroy = (req,res) => 
{
    Expense.deleteMany({"isDeleted" : true},function(err,result)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(result)
        }
    })       
}

expenseController.deleteArchived = (req,res) => 
{
    const id = req.params.id
    Expense.findByIdAndDelete(id)
        .then((expense) => 
        {
            res.json(expense)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}



// expenseController.show = (req,res) => 
// {
//     Expense.find()
//         .then((expenses) => 
//         {
//             res.json(expenses)
//         })
//         .catch((err) => 
//         {
//             res.json(err)
//         })
// }

module.exports = expenseController