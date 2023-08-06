const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressSession = require('express-session')
const routes = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())

app.use(expressSession({secret: 'max', saveUninitialized: false, resave:false}))

const CONNECTION_URL  = "mongodb+srv://shefiub0:rotimib0@cluster0.hvyhkpi.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL)

app.use(morgan('dev'))


app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('static'))


app.use('/api', routes)

module.exports = app