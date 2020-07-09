// controller for defaults in DB

const Controller = require('./../Controller')

// Date Helper
const Date = require('../../../helper/date')

// default Model
const Default = require('./../../model/default')
const User = require('./../../model/user')

class DefaultController extends Controller {
    async getDefaults(req, res, next) {
        // try {
        //     const defaultsGroupIds = req.headers['defaults'].split(',')
        //     const defaults = await Default.findDefaultsByCodeId(defaultsGroupIds)
        //     res.json(defaults)
        // } catch (error) {
        //     next(error)
        // }
    }

    async getDataForInsertUserForm(req, res, next) {
        const defaultsGroupIds = req.headers['defaults'].split(',')

        const defaults = await Default.findDefaultsByCodeId(defaultsGroupIds)
        const users = await User.getUserOnlyListForCombo()

        const TU_FCode = await User.getTU_FCode()

        // ایجاد کاربر بدون اطلاعات برای فرانت اند
        let exampleUser = {}
        const userFields = await User.getTableSchema('TUser')
        exampleUser = { ...userFields }
        exampleUser.TU_FCode = TU_FCode
        exampleUser.TU_FUserName = TU_FCode
        exampleUser.TU_FPassWord = TU_FCode
        exampleUser.TU_FActive = 1
        exampleUser.TU_FDateReg = Date.Now().date
        exampleUser.TU_FTimeReg = Date.Now().time
        exampleUser.TU_FActive = 1


        const response = {
            defaults,
            users,
            user: exampleUser,
            date: Date.Now()
        }
        res.status(200).json(response)
    }

    async getData(req, res, next) {
        try {
            // تعیین اطلاعات مورد نیاز براساس حالت پارامتر
            const mode = req.query.mode;
            const data = {
                defaultSchema: {},
                defaultTableData: []
            }

            if (mode === "default.init" || mode === "default.insert") {
                data.defaultSchema = await Default.getTableSchema('TDefault')
                data.defaultSchema = await this.setDefaultValue(data.defaultSchema, req.TU_FID)
                // اطلاعات جدول در حالت اولیه
                data.defaultTableData = await Default.getDefaultsChildren()
                // } else if (mode === "") {

            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    // تعیین مقادیر اولیه برای اسکیما دیفالت ها
    async setDefaultValue(schema, TD_FUserReg, FID_GROUP = 0) {
        try {
            schema.TD_FYear = process.env.YEAR_ACCOUNTING
            schema.TD_FDateReg = Date.Now().date
            schema.TD_FID_Group = FID_GROUP
            schema.TD_FUserReg = TD_FUserReg
            schema.TD_FCode = await Default.UFN_Coding('TDefault_FCode')
            return schema
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async insert(req, res, next) {
        try {
            const data = req.body
            console.log(data)
            const result = await Default.insert(data)
            this.responseHandler(result, res)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async getDefaultsForTable(req, res, next) {
        try {
            const data = {
                defaultSchema: {},
                defaultTableData: []
            }

            const groupId = req.params.id
            data.defaultTableData = await Default.getDefaultsChildren(groupId)
            res.json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const defaultId = req.params.id
            const result = await Default.delete(defaultId)
            this.responseHandler(result, res)
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        }
    }
}

module.exports = new DefaultController()

