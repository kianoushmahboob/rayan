const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Controller = require('./../Controller')
const attachUserToRequestHelper = require('./../../../helper/attachUserToRequest')
// models
const User = require('./../../model/user')
const Default = require('./../../model/default')
// helpers date,...
const Date = require('../../../helper/date')

class LoginController extends Controller {
    // getting user data by id
    async getUserData(req, res, next) {
        try {
            await attachUserToRequestHelper(req.TU_FID, req, next)

            const userId = req.params.id
            const defaultsGroupIds = req.headers['defaults'].split(',')

            const status = req.user.TU_FIsUser ? 'Employee' : 'Customer'
            // گرفتن اطلاعات مربط به نمایش در پروفایل
            let user
            let userBmans = []

            if (status === 'Customer') {
                user = await User.findByIdForCustomer(req.user.TU_FID)
            }
            if (status === 'Employee') {
                user = await User.findById(userId)
            }
            userBmans = await User.getUserOnlyListForCombo()

            let creator = {
                TU_FName: '',
                TU_FFamil: ''
            }
            if (user.TU_FUserReg && user.TU_FUserReg != 0) {
                creator = await User.findById(user.TU_FUserReg)
            }

            const defaults = await Default.findDefaultsByCodeId(defaultsGroupIds)
            const userSchema = await User.getTableSchema('TUser')

            const response = {
                user,
                defaults,
                userBmans,
                userSchema,
                date: Date.Now(),
                creator: creator.TU_FName + ' ' + creator.TU_FFamil
            }
            res.status(200).json(response)
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async createActivationCode(req, res, next) {
        try {

            const code = Controller.createCode(5)
            const result = await User.setActiveCode(code, req.TU_FID)
            res.status(200).json({ result, code })
            // create active code 
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async checkActivationCode(req, res, next) {
        try {
            const code = req.body.code
            const user = await User.findById(req.TU_FID)
            let result = null
            if (code == user.TU_FManager) {
                result = await User.setActiveUser(req.TU_FID)

                this.sendBackSueccessResponseToClient(res, this.messages.successActiveUser, 201)
                return
            }
            this.sendBackError(res, this.messages.faildActiveUser, 422)

            // check active code and active the user
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async insertUser(req, res, next) {
        try {
            //  check for valid request data
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                return
            }
            if (req.file) {
                req.body.TU_FPicAdd1 = req.file.path
            }
            const result = await User.create(req.body, req.TU_FID)
            if (result.output.RetID == -1) {
                const TU_FCode = await User.getTU_FCode()
                this.responseHandler(result, res, { TU_FCode })
                return
            }
            this.responseHandler(result, res)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async editProfile(req, res, next) {
        try {
            const errors = this.validationErrorHandler(req, res, next)
            if (errors) {
                // حذف عکس ذخیره شده به خاطره اعتبار سنجی فرم

                return
            }
            await attachUserToRequestHelper(req.TU_FID, req, next)

            const status = req.user.TU_FIsUser ? 'Employee' : 'Customer'

            // حدف عکس ذخیره شده در صورت افزودن عکس جدید
            if (req.file) {
                // const user = await User.findById(req.TU_FID)
                if (req.user.TU_FPicAdd1) {
                    this.removeImage(req.user.TU_FPicAdd1)
                }
                req.body.TU_FPicAdd1 = req.file.path
            }
            if (!req.body.TU_FPicAdd1) {
                if (req.user.TU_FPicAdd1) {
                    this.removeImage(req.user.TU_FPicAdd1)
                }
            }
            // حذف عکس پروفایل در صورت حذف عکس و وارد نکردن عکس جدید
            // if ()
            // اپدیت کردن پروفایل در دو حالت مشتری و کارمند
            const result = await User.update(req.body, status)

            // اطلاعات تغییر یافته احتمالی برای vuex
            const updatedProfile = {
                TU_FName: req.body.TU_FName,
                TU_FFamil: req.body.TU_FFamil,
                TU_FActive: req.body.TU_FActive,
                TU_FPicAdd1: req.body.TU_FPicAdd1,
                TU_FIsUser: req.body.TU_FIsUser,
            }
            // console.log('updatedProfile', updatedProfile)
            this.responseHandler(result, res, updatedProfile)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            await attachUserToRequestHelper(req.TU_FID, req, next)

            let status
            if (req.query.table == 'true') {
                status = 'table'
            } else if (req.query.table == 'false') {
                status = 'user'
            } else {
                status = 'normal'
            }

            let defaults = []
            let userBmans = []
            if (status == 'table' || status == 'user') {
                const defaultsGroupIds = req.headers['defaults'].split(',')
                defaults = await Default.findDefaultsByCodeId(defaultsGroupIds)
                userBmans = await User.getUserOnlyListForCombo()
            }
            // ایجاد یک کاربر با اطلاعات اولیه
            const TU_FCode = await User.getTU_FCode()
            let userSchema = {}
            const userFields = await User.getTableSchema('TUser')
            userSchema = { ...userFields }
            userSchema.TU_FCode = TU_FCode
            userSchema.TU_FUserName = TU_FCode
            userSchema.TU_FPassWord = TU_FCode
            userSchema.TU_FActive = 1
            userSchema.TU_FDateReg = Date.Now().date
            userSchema.TU_FTimeReg = Date.Now().time
            userSchema.TU_FActive = 1
            let users
            if (status !== 'user') {
                users = await User.getAllUserForTable()
            }

            const creator = req.user.TU_FName + ' ' + req.user.TU_FFamil
            res.json({
                users, userSchema, defaults, userBmans, date: Date.Now(), creator
            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id
            if (req.user.TU_FID == userId) {
                this.sendBackError(res, 'شما مجاز به این حذف نمیباشید', 422)
                return
            }
            const result = await User.delete(userId)
            this.responseHandler(result, res)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    async deleteGroupUser(req, res, next) {
        try {
            const idArrays = req.params.ids
            let result
            for (const id of idArrays) {
                result = await User.delete(userId)
            }
            this.responseHandler(result, res)

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }

    // گرفتن ساختار کاربر
    // register user
    async getUserTableSchema(req, res, next) {
        try {
            // ایجاد یک کاربر با اطلاعات اولیه
            const TU_FCode = await User.getTU_FCode()
            let userSchema = {}
            const userFields = await User.getTableSchema('TUser')
            userSchema = { ...userFields }
            userSchema.TU_FCode = TU_FCode
            userSchema.TU_FUserReg = 0
            userSchema.TU_FDateReg = Date.Now().date
            userSchema.TU_FTimeReg = Date.Now().time
            res.json({
                userSchema, date: Date.Now()
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }
}

module.exports = new LoginController()