const router = require('express').Router();
const usersModel = require('./users-model')
const postsModel = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const customMiddleware = require('../middleware/middleware')


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usersModel
    .get()
    .then((users) => {
      const justNames = users.map(eachUser => {
        return { "name": eachUser.name }
      })
      console.log(justNames, "just Names")
      res.status(200).json(justNames)
    })
});

router.get('/:id', customMiddleware.validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const foundUser = await usersModel.getById(req.params.id)
    res.status(200).json(foundUser)
  } catch {
    res.status(500).json({ message: "The post information could not be retrieved" })
  }
});

router.post('/', customMiddleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel
    .insert(req.body)
    .then((data) => {
      res.status(201).json({ id: data.id, name: req.body.name });
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
});

router.put('/:id', customMiddleware.validateUserId, customMiddleware.validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  let id = req.params.id
  usersModel
    .update(id, req.body)
    .then((updated) => {
      console.log(updated, "updated user")
      usersModel.getById(id).then((resultById) => { res.status(200).json(resultById) })
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be modified" })
    })
});

router.delete('/:id', customMiddleware.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  let id = req.params.id
  try {
    await usersModel.remove(id) // don't forget the await keyword
    res.status(200).json(usersModel.getById(id))

  } catch {
    res.status(500).json({ message: "The user could not be deleted" })
  }
});

router.get('/:id/posts', customMiddleware.validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const foundUsersPost = await usersModel.getUserPosts(req.params.id)
    res.status(200).json(foundUsersPost)
  } catch {
    res.status(500).json({ message: "The post could not be retrieved" })
  }
});

router.post('/:id/posts', customMiddleware.validateUserId, customMiddleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postsModel
    .insert(req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ message: "The created post could not be saved" })

    })
});

// do not forget to export the router
module.exports = router;