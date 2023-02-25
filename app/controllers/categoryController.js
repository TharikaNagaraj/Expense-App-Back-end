const Category = require ("../models/categoryModel")
const Expense = require("../models/expenseModel")

const categoryController  = {}

categoryController.create = (req,res) => 
{
    const body = req.body
    body.userId = req.user.id
    // console.log(body)
    Category.exists({"userId":body.userId},function(err,result)
    {
        if(err)
        {
           console.log(err)
        }
        else
        {
            if(result === null)
            {
                const category = new Category(body)
                category.save()
                    .then((category) => 
                    {
                        res.json(category)

                    })
                    .catch((err) => 
                    {
                        res.json(err)
                    })
            }
            else
            {
                Category.find({"userId" : body.userId})
                    .then((categories) => 
                    {
                        const result = categories.filter((ele) => 
                        {
                            return(ele.name == body.name)
                        })
                        console.log('result',result)
                        if(result.length == 0)
                        {
                            const category = new Category(body)
                            category.save() 
                                .then((ele) => 
                                {
                                    res.json(ele)
                                })
                                .catch((err) => 
                                {
                                    res.json(err)
                                })
                        }
                        else
                        {
                            res.json(
                                message = "Category already exists"
                            )
                        }
                    })
                    .catch((err) => 
                    {
                        console.log(err)
                    })
            }
        }
    })
}

categoryController.list = (req,res) => 
{
    const id = req.user._id
    Category.find({"userId": id})
    // .populate("userId")
    //     .then((categories) => 
    //     {
           
    //         res.json(categories)
    //         // console.log('result',result)
    //     })
        .then((categories) => 
        {
            res.json(categories)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

// categoryController.showAll = (req,res) => 
// {
//     Category.find().populate("userId")
//         .then((categories) => 
//         {
//             res.json(categories)
//         })
//         .catch((err) => 
//         {
//             res.json(err)
//         })
// }

categoryController.delete = (req,res) => 
{
    const id = req.params.id
    Expense.find({"categoryId" : id})
        .then((expenses) => 
        {
            if(expenses.length == 0)
            {
                Category.findByIdAndDelete(id)
                    .then((category) => 
                    {
                        res.json(category)
                    })
                    .catch((err) => 
                    {
                        res.json(err)
                    })
            }
            else
            {
                res.json(
                    message = "Category cannot be deleted"
                )
            }
        })
        .catch((err) => 
        {
            console.log(err)
        })
}

categoryController.destroy = (req,res) => 
{
    Category.deleteMany({},function(err,result) 
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


module.exports = categoryController