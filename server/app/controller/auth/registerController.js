// models
const User = require('./../../model/user')

// controllers
const Controller = require('./../Controller')

class RegisterController extends Controller {

    async postRegister(req, res, next) {
        try {
            // check for valid request data
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }
            const userData = req.body
            const result = await User.create(userData, 0)
            this.responseHandler(result, res)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }
}

module.exports = new RegisterController()