const User = require('./../app/model/user')

module.exports = async (TU_FID, req, next) => {
    try {
        const user = await User.findById(TU_FID)
        req.user = user
    } catch (error) {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}