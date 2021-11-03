const usersModel = require('../users/users-model')
// const postsModel = require('../posts/posts-model')
// do not forget to expose these functions to other modules
module.exports = { logger, validatePost, validateUser, validateUserId }

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeRightNow = new Date()

  console.log("Request Method: ", req.method)
  console.log('\n', "Request URL: ", req.url)
  console.log('\n', "Time and Date: ", timeRightNow.toGMTString())
  // console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}} from ${req.get('/users')}`)
  next();
}

// - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.
//   - if the `id` parameter is valid, ******---->>store the user object as `req.user` and allow the request to continue
//   - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  usersModel
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error" });
    })
}

// - `validateUser` validates the `body` on a request to create or update a user
// - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

// - `validatePost` validates the `body` on a request to create a new post
//   - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }

}

