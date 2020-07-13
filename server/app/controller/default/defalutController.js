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
  // updated
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
      schema.TD_FCode = Number(await Default.UFN_Coding('TDefault_FCode', FID_GROUP))
      return schema
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async insert(req, res, next) {
    try {
      const data = req.body
      const result = await Default.insert(data)
      this.responseHandler(result, res)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body
      const result = await Default.update(data)
      this.responseHandler(result, res)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getDefaultsForTable(req, res, next) {
    try {
      // تعیین اطلاعات مورد نیاز براساس حالت پارامتر
      const mode = req.query.mode;
      const id = req.params.id;
      const data = {
        defaultSchema: {},
        defaultTableData: [],
        defaultFormData: {}
      }
      if (mode === "default.insert") {
        data.defaultSchema = await Default.getTableSchema('TDefault')
        data.defaultSchema = await this.setDefaultValue(data.defaultSchema, req.TU_FID, id)
        // اطلاعات جدول در حالت اولیه
      } else if (mode === "default.init") {
        data.defaultSchema = await Default.getTableSchema('TDefault')
        data.defaultSchema = await this.setDefaultValue(data.defaultSchema, req.TU_FID, id)
        data.defaultTableData = await Default.getDefaultsChildren(id)
      } else if (mode === "default.children") {
        data.defaultTableData = await Default.getDefaultsChildren(id)
      } else if (mode === "default.show") {
        data.defaultFormData = await Default.findById(id)
        console.log(await Default.findById(id))
      }
      res.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      const result = await Default.delete(id)
      console.log('result', result)
      this.responseHandler(result, res)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = new DefaultController()

