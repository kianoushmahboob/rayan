const { body } = require('express-validator')

class RegisterValidation {
    constructor() {
        return [
            // body('TU_FEmail').trim().isEmail().withMessage('ایمیل معتبر نمیباشد'),
            body('TU_FUserName').trim().notEmpty().withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FUserName').trim().isLength({ min: 5, max: 20 }).withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FName').trim().notEmpty().withMessage('فیلد نام اجباریست'),
            body('TU_FFamil').trim().notEmpty().withMessage('فیلد نام خانوادگی اجباریست'),
            body('TU_FMobile1').trim().notEmpty().withMessage('فیلد شماره تلفن اجباریست'),
            body('TU_FMobile1').trim().isLength({ min: 10, max: 11 }).withMessage('فیلد شماره تلفن معتبر نیست'),
            body('TU_FMobile1').trim().isNumeric().withMessage(' شماره تلفن معتبر نمیباشد'),
            body('TU_FPassWord').trim().isLength({ min: 5 }).withMessage('طول پسورد باید حداقل 5 کاراکتر باشد'),
            body('confirmPassword').trim().custom((value, { req }) =>{
                console.log('value', value)
                console.log(req.body.TU_FPassWord)
                if (value.trim() !== req.body.TU_FPassWord.trim()) {
                    return false
                }
                return true
            }).withMessage('رمز عبور مطابقت ندارد'),
        ]
    }
}

module.exports = new RegisterValidation()