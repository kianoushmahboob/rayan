// authentications routes
const express = require('express')

// controllers 
const UserController = require('./../../controller/auth/userController')

// middlewares
const isAuthenticated = require('./../../middleware/is-auth')
const isUser = require('./../../middleware/is-user')

// validations
const InsertUserValidation = require('./../../validation/user/insert')

const router = express.Router()

// routes

// get user schema for register
router.get('/user/get-schema', UserController.getUserTableSchema)
// get user data -> /profile 
router.get('/user/:id', isAuthenticated, UserController.getUserData)

router.patch('/update-profile', isAuthenticated, InsertUserValidation, UserController.editProfile)
// insert user Validation nedded
router.post('/insert-user', InsertUserValidation, isAuthenticated, isUser, UserController.insertUser)

router.get('/get-users', isAuthenticated, isUser, UserController.getAllUsers)

router.delete('/delete/:id', isAuthenticated, isUser, UserController.deleteUser)

router.delete('/user/delete', isAuthenticated, isUser, UserController.deleteGroupUser)


module.exports = router