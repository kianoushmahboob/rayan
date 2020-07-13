const { body } = require('express-validator')

class InsertAndUpdateDefaultValidation {
    constructor () {
        return [
            body('TD_FName').trim().notEmpty().withMessage('نام زیر گروه نباید خالی باشد'),
            body('TD_FCode').trim().notEmpty().withMessage('کد زیرگروه نباید خالی باشد'),
            body('TD_FCode').trim().isNumeric().withMessage('کد زیر گروه باید به صورت عدد باشد'),
            body('TD_FOrder').trim().isNumeric().withMessage('ترتیب باید به صورت عدد باشد'),
            body('TD_FValue1').trim().isNumeric().withMessage('مقدار ۱ باید به صورت عدد باشد'),
            body('TD_FValue2').trim().isNumeric().withMessage('مقدار ۲ باید به صورت عدد باشد'),
        ]
    }
}

module.exports = new InsertAndUpdateDefaultValidation()