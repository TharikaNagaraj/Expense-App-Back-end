const express = require('express')
// const http = require('http')
const port = 3050

const usersController = require("./app/controllers/usersController")
const expenseController = require("./app/controllers/expenseController")
const Expense = require("./app/models/expenseModel")
// const configureDatabase = require("./config/database")

// const server = http.createServer((request,response) => 
// {
//     if(request.url == "/api/users/all-expense")
//     {
//         Expense.find({"isArchived" : true})
//         .then((expenses) => 
//         {
//             response.end(JSON.stringify(expenses))
//         })
//         .catch((err) => 
//         {
//             response.end(err)
//         })
        // expenseController.showAll
//     }
// })

// server.listen(port,() => 
// {
//     console.log("server is running on port",port)
// })

const app = express()
const cors = require('cors')
const configureDatabase = require('./config/database')
const router = require('./config/routes')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(router)


app.listen(port,() => 
{
    console.log('server is running on port', port)
})
configureDatabase()