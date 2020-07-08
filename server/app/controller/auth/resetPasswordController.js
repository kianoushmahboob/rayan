const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Controller = require('../Controller')
// user model
const User = require('../../model/user')

class ResetPasswordController extends Controller {
    async createAndSendCodeToUser(req, res, next) {
        try {

            // check for valid request data
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }

            const TU_FUserName = req.body.TU_FUserName
            const user = await User.findByUsername(TU_FUserName)
            if (!user) {
                this.userNotFoundError(res)
                return
            }
            const code = Controller.createCode(5)

            const secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY
            const resetToken = jwt.sign({
                code: code,
                TU_FUserName: user.TU_FUserName
            }, secretKey, { expiresIn: '10m' })

            const decodedToken = jwt.verify(resetToken, secretKey)

            // user.resetPasswordToken = resetToken
            const result = await User.setToken(user.TU_FID, resetToken)
            if (this.responseErrorHandler(result, res)) {
                return
            }
            // set reset token
            if (result) {
                const responseData = {
                    TU_FUserName: user.TU_FUserName,
                    resetToken,
                    code: code,
                    status: 200
                }
                res.status(200).json(responseData)
            }
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async checkCodeAndToken(req, res, next) {
        try {
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }

            const TU_FUserName = req.body.TU_FUserName
            const resetToken = req.body.resetToken
            const code = req.body.code

            const user = await User.findByUsername(TU_FUserName)
            if (!user) {
                this.userNotFoundError(res)
                return
            }
            const secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY
            let decodedToken

            try {
                decodedToken = jwt.verify(resetToken, secretKey)
            } catch (error) {
                const message = 'شما مجاز به تغییر رمز نمیباشید'
                this.sendBackError(res, message, 403)
                return
            }

            if (code != decodedToken.code) {
                const message = 'کد وارد شده اشتباه میباشد'
                this.sendBackError(res, message, 403)
                return
            }

            const responseData = {
                TU_FUserName: user.TU_FUserName,
                status: 200
            }
            res.status(200).json(responseData)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async changePassword(req, res, next) {
        try {
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }

            const TU_FUserName = req.body.TU_FUserName
            const TU_FPassWord = req.body.TU_FPassWord
            let oldPassword
            if (req.body.oldPassword) {
                oldPassword = req.body.oldPassword
            }
            const user = await User.findByUsername(TU_FUserName)
            if (!user) {
                this.userNotFoundError(res)
                return
            }
            if (oldPassword) {
                if (user.TU_FPassWord !== oldPassword) {
                    this.userNotFoundError(res)
                    return
                }
            }
            const result = await User.changePassword(user.TU_FID, TU_FPassWord)
            if (this.responseErrorHandler(result, res)) {
                return
            }
            // clear reset token
            res.status(201).json({ status: 201 })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }
}

module.exports = new ResetPasswordController()