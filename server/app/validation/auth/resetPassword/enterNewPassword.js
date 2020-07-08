const { body } = require('express-validator')

class reserPasswordValidation {
    constructor() {
        return [
            body('TU_FPassWord').trim().isLength({ min: 5 }).withMessage('طول پسورد باید حداقل 5 کاراکتر باشد'),
            body('confirmPassword').trim().custom((value, { req }) => {
                if (value.trim() !== req.body.TU_FPassWord.trim()) {
                    return false
                }
                return true
            }).withMessage('رمز عبور مطابقت ندارد'),
            body('changePassword').custom((value, { req }) =>{
                if (value) {
                    console.log('11111')
                    if (!req.body.oldPassword) {
                        return false
                    }
                    return true
                }
                return true
            }).withMessage('رمز عبور فعلی خود را وارد کنید'),  
        ]
    }
}

module.exports = new reserPasswordValidation()