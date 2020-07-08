const autoBind = require('auto-bind')
const { validationResult } = require('express-validator')

const messages = require('./../../util/messages')

class ErrorController {
    constructor() {
        autoBind(this)
        this.errorMessages = []
        this.messages = messages
    }

    // validation error handler
    validationErrorHandler(request, response, next) {
        const validationErrors = validationResult(request)
        if (!validationErrors.isEmpty()) {
            this.errorMessages = validationErrors.array().map(error => {
                return error.msg
            })
            // پاک کردن عکس الحاق شده به فرم از سرور
            if (request.file) {
                this.removeImage(request.file.path)
            }
            response.status(422).json({ mesages: this.errorMessages, error: true })
            return true
        }
        return false
    }

    /**
     * @param {Array} message - The date
     * @param {string} statusCode - The string
    */
    // custom error | messages ->array
    sendBackErrors(response, messages, statusCode) {
        response.status(statusCode).json({ mesages: messages, error: true })
    }

    /**
     * @param {string} message - The date
     * @param {string} statusCode - The string
    */
    // custom error | message -> string
    sendBackError(response, message, statusCode) {
        response.status(statusCode).json({ mesages: [message], error: true })
    }

    sendBackSueccessResponseToClient(response, messages, code = 200) {
        response.status(code).json({ mesages: [messages], error: false })

    }

    userNotFoundError(response) {
        response.status(404).json({ mesages: [this.messages.loginWrongUsernameOrPassword], error: true })
    }

    notAuthenticatedError(response) {
        response.status(401).json({ mesages: [this.messages.notAuthenticated], error: true })
    }

    isNotUserError(response) {
        response.status(401).json({ mesages: [this.messages.isNotUser], error: true })
    }

    databaseNotConnected(response) {
        response.status(500).json({ mesages: [this.messages.databaseNotConnected], error: true })
    }

    databaseErrorHandler(response) {
        response.status(500).json({ mesages: [this.messages.databaseIntenalError], error: true })
    }

    // responses from database
    responseHandler(result, response, otherData) {
        if (!result) {
            this.databaseErrorHandler(response)
        } else {
            if (result.output.RetID > 0) {
                response.status(200).json({ mesages: [result.output.RetMsg], otherData, error: false })
            } else {
                response.status(422).json({ mesages: [result.output.RetMsg], otherData, error: true })
            }
        }
    }

    // responses from database
    responseErrorHandler(result, response) {
        if (!result) {
            this.databaseErrorHandler(response)
        } else {
            if (result.output.RetID < 0) {
                response.status(422).json({ mesages: [result.output.RetMsg], error: true })
                return true
            }
        }
    }
}

module.exports = ErrorController

