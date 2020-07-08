const { body } = require('express-validator')

class LoginValidation {
    constructor() {
        return [
            body('TU_FUserName').trim().notEmpty().withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FPassWord').trim().isLength({ min: 5 }).withMessage('طول پسورد باید حداقل 5 کاراکتر باشد'),
        ]
    }
}

module.exports = new LoginValidation()