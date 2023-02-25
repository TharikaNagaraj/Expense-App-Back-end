const express = require('express')
const router = express.Router()
const usersController = require("../app/controllers/usersController")
const budgetController = require("../app/controllers/budgetController")
const categoryController = require("../app/controllers/categoryController")
const expenseController = require("../app/controllers/expenseController")
const {authenticateUser} = require("../app/middleware/userMiddleware")
const budgetMiddleware = require("../app/middleware/budgetMiddleware")
// const {imageUpload}= require("../app/middleware/userMiddleware")
const multer = require("multer")

const multerStorage = multer.diskStorage({
    destination : (req,file,cb) =>
    {
        cb(null,'./uploads/')
    },
    filename:(req,file,cb) => 
    {
        const ext = file.mimetype.split("/")[1]
        cb(null,`${file.fieldname}-${file.originalname}-${Date.now()}.${ext}`)
    }
})
const upload = multer({
    storage : multerStorage
})



router.post("/api/users/register",usersController.register)
router.post("/api/users/login",usersController.login)
router.post("/api/users/account/profile",authenticateUser,upload.single("photo"),usersController.update)
router.get("/api/users/account",usersController.list)
router.get("/api/users/account/profile",authenticateUser,usersController.show)
router.delete("/api/users/:id",usersController.destroy)
    

router.get("/api/users/budget",authenticateUser,budgetController.show)
router.get("/api/users/budget/archived-budgets",authenticateUser,budgetController.showArchivedList)
router.post("/api/users/budget",authenticateUser,budgetController.create)
router.post("/api/users/budget/archive/:id",budgetController.archive)
// router.get("/api/users/budget",budgetController.list)
router.delete("/api/users/budget/:id",budgetController.destroy)



router.post("/api/users/category",authenticateUser,categoryController.create)
router.get("/api/users/categories",authenticateUser,categoryController.list)
// router.get("/api/users/all-categories",categoryController.showAll)
router.delete("/api/users/categories/:id",categoryController.delete)
router.delete("/api/users/categories/delete/all",categoryController.destroy)



router.post("/api/users/expense",authenticateUser,expenseController.create)
router.post("/api/users/expense/:id",expenseController.update)
router.get("/api/users/expense",authenticateUser,budgetMiddleware,expenseController.list)
router.get("/api/users/all-expense",expenseController.showAll)
router.get("/api/users/expense/:id",expenseController.show)
router.get("/api/users/archived-expense/:id",expenseController.showArchivedList)
router.delete("/api/users/expense/:id",expenseController.delete)
router.delete("/api/users/expense-delete/many-delete",expenseController.destroy)
router.delete("/api/users/archived-expense/:id",expenseController.deleteArchived)
// router.get("/api/users/expenses",expenseController.show)





module.exports = router