const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Controller = require('./../Controller')
// user model
const User = require('./../../model/user')

class LoginController extends Controller {
    // user login
    async postLogin(req, res, next) {
        try {
            // check for valid request data
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }

            const TU_FUserName = req.body.TU_FUserName
            const TU_FPassWord = req.body.TU_FPassWord
            const rememberMe = req.body.rememberMe || false
            // specifing the token expire time 
            const expiresIn = rememberMe ? '36d' : '12d'
            const expiresInDay = rememberMe ? 36 : 12
            // const expiresIn = '1m'

            const user = await User.findByUsername(TU_FUserName)
            if (!user) {
                this.userNotFoundError(res)
                return
            }
            // password check -> after that make hash password
            // ****

            // wrong entered password
            if (user.TU_FPassWord !== TU_FPassWord) {
                this.userNotFoundError(res)
                return
            }
            // creating json token for authorization
            const secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY
            const token = jwt.sign({
                TU_FUserName: user.TU_FUserName,
                TU_FID: user.TU_FID
            }, secretKey, { expiresIn })

            const result = await User.setToken(user.TU_FID, token)
            if (this.responseErrorHandler(result, res)) {
                return
            }

            const decodedToken = jwt.verify(token, secretKey)

            const responseData = {
                TU_FUserName: user.TU_FUserName,
                TU_FName: user.TU_FName,
                TU_FFamil: user.TU_FFamil,
                TU_FActive: user.TU_FActive,
                TU_FPicAdd1: user.TU_FPicAdd1,
                TU_FID: user.TU_FID,
                TU_FIsUser: user.TU_FIsUser,
                // other datas
                token,
                expiresIn: decodedToken.exp,
                expiresInDay
            }

            res.status(200).json(responseData)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }
}

module.exports = new LoginController()