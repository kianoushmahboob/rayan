const { body } = require('express-validator')

class InsertUserValidation {
    constructor() {
        return [
            // body('TU_FEmail').trim().isEmail().withMessage('ایمیل معتبر نمیباشد'),
            body('TU_FUserName').trim().isLength({ min: 5 }).withMessage('نام کاربری باید حداقل 5 کاراکتر باشد'),
            body('TU_FCode').trim().notEmpty().withMessage('کد کاربری نباید خالی باشد'),
            body('TU_FName').trim().notEmpty().withMessage('نام نباید خالی باشد'),
            body('TU_FFamil').trim().notEmpty().withMessage('نام خانوادگی نباید خالی باشد'),
            body('TU_FCode').trim().isInt().withMessage('کد کاربر باید به صورت عددی باشد'),
            body('TU_FCodeMeli').trim().custom((value, {req}) => {
                if (value.length === 10 || value.length === 11 || value.length === 0) {
                    return true
                }
                return false
            }).withMessage('در صورت وارد شدن کد ملی باید 10 الی 11 رقم باشد'),
          // date validations with Date controller
        ]
    }
}

module.exports = new InsertUserValidation()