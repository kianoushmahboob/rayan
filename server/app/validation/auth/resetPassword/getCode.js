const { body } = require('express-validator')

class resetPasswordValidation {
    constructor() {
        return [
            body('code').trim().notEmpty().withMessage('لطفا کد پیامک شده را وارد کنید'),
        ]
    }
}

module.exports = new resetPasswordValidation()