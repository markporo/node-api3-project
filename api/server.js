const express = require('express')
const server = express()
const { logger } = require("./middleware/middleware")
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

//requiring/ importing usersRouter
const usersRouter = require('./users/users-router')


//middleware
server.use(morgan('dev'))
server.use(express.json()) // remember express by default cannot parse JSON in request bodies
server.use(helmet())
server.use(cors())

//custom made middleware used by server
server.use(logger)
//server.use(customMiddleware.validateUserId)
// server.use(customMiddleware.validateUser)
// server.use(customMiddleware.validatePost)

//connecting usersRouter as a route
server.use('/users', usersRouter)


// get home
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//export server
module.exports = server;
