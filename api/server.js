const express = require('express')
const server = express()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')


//requiring/ importing usersRouter
const usersRouter = require('./users/users-router')

//connecting usersRouter as a route
server.use('/users', usersRouter)

//middleware
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json()) // remember express by default cannot parse JSON in request bodies

// get home
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
