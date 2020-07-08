const jwt = require('jsonwebtoken')
const User = require('./../model/user')

const ErrorController = require('./../controller/errorController')
const errorConteroller = new ErrorController()

module.exports = async (req, res, next) => {
    // get token from client
    const authorizationHeader = req.get('Authorization')
    if (!authorizationHeader) {
        errorConteroller.notAuthenticatedError(res)
        return
    }
    // getting token value and decode it
    const token = authorizationHeader.split(' ')[1]

    let decodedToken
    try {
        const jsonWebTojenSecretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY
        // verifing json web token and decode it
        decodedToken = jwt.verify(token, jsonWebTojenSecretKey)
    } catch (error) {
        console.log(error)
        errorConteroller.notAuthenticatedError(res)
        return
    }
    if (!decodedToken) {
        errorConteroller.notAuthenticatedError(res)
        return
    }
    
    req.TU_FID = decodedToken.TU_FID
     User.setLoginLastDate(req.TU_FID)
    next()
}