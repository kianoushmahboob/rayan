// authentications routes
const express = require('express')

// controllers 
const RegisterController = require('./../../controller/auth/registerController')
const LoginController = require('./../../controller/auth/loginController')
const ResetPasswordController = require('./../../controller/auth/resetPasswordController')
const UserController = require('./../../controller/auth/userController')

// middlewares
const isAuthenticated = require('./../../middleware/is-auth')
const isUser = require('./../../middleware/is-user')

// validations
const LoginValidation = require('./../../validation/auth/login')
const RegisterValidation = require('./../../validation/auth/register')
const getUsernameValidation = require('./../../validation/auth/resetPassword/getUsername')
const getResetPasswordCodeValidation = require('./../../validation/auth/resetPassword/getCode')
const resetPasswordValidation = require('./../../validation/auth/resetPassword/enterNewPassword')
const InsertUserValidation = require('./../../validation/user/insert')

const router = express.Router()

// routes

// register route -> creating a user
router.post('/register', RegisterValidation, RegisterController.postRegister)

// login route 
router.post('/login', LoginValidation, LoginController.postLogin)

// froget password api -> create reset token , creating code, validating the code and change the password
router.post('/reset-password', getUsernameValidation, ResetPasswordController.createAndSendCodeToUser)
router.post('/check-reset-password', getResetPasswordCodeValidation, ResetPasswordController.checkCodeAndToken)

// change password from profile
router.post('/change-password', resetPasswordValidation, ResetPasswordController.changePassword)

router.post('/create-active-code', isAuthenticated, UserController.createActivationCode)
router.post('/check-active-code', isAuthenticated, UserController.checkActivationCode)



module.exports = router