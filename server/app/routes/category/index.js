// defaults routes
const express = require('express')

const router = express.Router()

const isAuthenticated = require('./../../middleware/is-auth')
const isUser = require('./../../middleware/is-user')


// controllers
const CategoryController = require('./../../controller/category/categoryController')
// valiation
// const InsertAndUpdateValidation = require('./../../validation/default/insert')
// routes

// router.get('/default', isAuthenticated, isUser, DefaultController.getData)
router.get('/category/:id', isAuthenticated, isUser, CategoryController.getCategory)

router.post('/category', isAuthenticated, isUser, CategoryController.insert)

router.delete('/category/:id', isAuthenticated, isUser, CategoryController.delete)

router.patch('/category', isAuthenticated, isUser, CategoryController.update)

module.exports = router