const mongoose = require('mongoose')

const configureDatabase = () => 
{
    mongoose.set('strictQuery',false)
    mongoose.connect('mongodb://localhost:27017/expense-app')
    .then(() =>
    {
        console.log('Conected to DB')
    })
    .catch((err) => 
    {
        console.log('Error connecting to DB')
    })
}

module.exports = configureDatabase