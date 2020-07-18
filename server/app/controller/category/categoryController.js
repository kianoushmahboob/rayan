const Controller = require('./../Controller')

// Model 
const Category = require('./../../model/category')
const User = require('./../../model/user')

// Date Helper
const Date = require('../../../helper/date')

class CategoryController extends Controller {

  async getCategory(req, res, next) {
    try {
      // params => status = insert.init, show.init, update.init, children
      const mode = req.query.mode
      const id = req.params.id

      const data = {
        tableData: [],
        formData: {}
      }

      if (mode == "insert.init") {
        const schema = await Category.getTableSchema("TCategory")
        const users = await User.getUserOnlyListForCombo()
        data.formData = await this.setDefaultValue(schema, req.TU_FID, id)
        data.formData.users = [...users]
      } else if (mode == "show.init" || mode == "update.init") {
        data.formData = await Category.findById(id)
      } else if (mode == "children") {
        data.tableData = await Category.findByGroupId(id)
      }
      res.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async insert(req, res, next) {
    try {
      // const errors = this.validationErrorHandler(req, res, next)
      // if (errors) {
      //   return
      // }
      const data = req.body
      const result = await Category.create(data)
      this.responseHandler(result, res)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      // const errors = this.validationErrorHandler(req, res, next)
      // if (errors) {
      //   return
      // }
      const data = req.body
      const result = await Category.update(data)
      this.responseHandler(result, res)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      const result = await Category.delete(id)
      this.responseHandler(result, res)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  // تعیین مقادیر اولیه برای اسکیما دسته بندی ها
  async setDefaultValue(schema, TD_FUserReg, FID_GROUP = 0) {
    try {
      schema.TC_FYear = process.env.YEAR_ACCOUNTING
      schema.TC_FDateReg = Date.Now().date
      schema.TC_FTimeReg = Date.Now().time
      schema.TC_FID_Group = FID_GROUP
      schema.TC_FUserReg = TD_FUserReg
      schema.TC_FCode = Number(await Category.UFN_Coding('TCategory_FCode', FID_GROUP))
      return schema
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}

module.exports = new CategoryController()

