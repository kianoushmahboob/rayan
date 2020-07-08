const Database = require('./../model/Model')
const ErrorController = require('./../controller/errorController')

module.exports = async (req, res, next) => {
    const isConnected = await new Database().checkConnection()
    if(!isConnected) {
        const errorController = new ErrorController()
        errorController.databaseNotConnected(res)
        return
    }
    next()
}
