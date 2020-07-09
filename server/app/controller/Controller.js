// main controller
const fs = require('fs')
const path = require('path')

const autoBind = require('auto-bind')
const ErrorController = require('./errorController')
// root path util
const RootPath = require('./../../util/path')
const Model = require('./../model/Model')

class Controller extends ErrorController {
    constructor () {
        super()
        autoBind(this)
    }

    static createCode(number) {
        return Math.floor(Math.random() * Math.pow(10, number))
    }

    removeImage(imagePath) {
        fs.unlink(path.join(RootPath, imagePath), (err => {
            console.log(err)
        }))
    }

    removeImages(imageArray = []) {
        for (const files of imageArray) {
            fs.unlink(path.join(RootPath, files.path), (err => {
                console.log(err)
            }))
        }
    }
}

module.exports = Controller

