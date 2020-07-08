const User = require('./../model/user')

const ErrorController = require('./../controller/errorController')
const errorConteroller = new ErrorController()
const attachUserToRequestHelper = require('./../../helper/attachUserToRequest')

module.exports = async (req, res, next) => {
    if (!req.user) {
       await attachUserToRequestHelper(req.TU_FID, req, next)
    }
   
    if(req.user.TU_FIsUser !== 1) {
        errorConteroller.isNotUserError(res)
        return
    }
    
    next()
}