// defaults routes
const express = require('express')

const router = express.Router()

const isAuthenticated = require('./../../middleware/is-auth')
const isUser = require('./../../middleware/is-user')


// controllers
const DefaultController = require('./../../controller/default/defalutController')
const defalutController = require('./../../controller/default/defalutController')
// valiation
const InsertAndUpdateValidation = require('./../../validation/default/insert')
// routes

// router.get('/default', isAuthenticated, isUser, DefaultController.getData)
router.get('/default/:id/init', isAuthenticated, isUser, DefaultController.getDefaultsForTable)

// اطلاعات select و کد شخص فرم ایجاد کاربر
router.get('/defaults/insert-user-form', isAuthenticated, isUser, DefaultController.getDataForInsertUserForm)

router.post('/default', isAuthenticated, isUser, InsertAndUpdateValidation, DefaultController.insert)

router.delete('/default/:id', isAuthenticated, isUser, defalutController.delete)

router.patch('/default', isAuthenticated, isUser, InsertAndUpdateValidation, DefaultController.update)

module.exports = router