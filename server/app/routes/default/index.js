// defaults routes
const express = require('express')

const router = express.Router()

const isAuthenticated = require('./../../middleware/is-auth')
const isUser = require('./../../middleware/is-user')


// controllers
const DefaultController = require('./../../controller/default/defalutController')
// routes

router.get('/default', isAuthenticated, isUser, DefaultController.getData)
router.get('/default/:id', isAuthenticated, isUser, DefaultController.getDefaultsForTable)

// اطلاعات select و کد شخص فرم ایجاد کاربر
router.get('/defaults/insert-user-form', isAuthenticated, isUser, DefaultController.getDataForInsertUserForm)

router.post('/default', isAuthenticated, isUser,  DefaultController.insert)

router.delete('/default/:id', isAuthenticated, isUser,  DefaultController.delete)

module.exports = router