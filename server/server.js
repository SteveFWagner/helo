require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const app = express()

const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env
const ct = require('./controller')

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    console.log('DFT has das dataz!')
    app.listen(SERVER_PORT, console.log(`Das Funky Towne has ears on port ${SERVER_PORT}`))
})


//Endpoints below

app.post('/api/auth/register', ct.register)
app.post('/api/auth/login', ct.login)

app.get('/api/posts/:id',ct.getPosts)
app.get('/api/post/:id',ct.getPost)