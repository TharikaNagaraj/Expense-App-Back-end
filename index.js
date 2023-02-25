const express = require('express')
const app = express()
const cors = require('cors')
const configureDatabase = require('./config/database')
const router = require('./config/routes')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(router)

const port = 3050
app.listen(port,() => 
{
    console.log('server is running on port', port)
})
configureDatabase()