const express = require('express')
const bodyParser = require('body-parser')
const Database = require('./model/Model')
const cors = require('cors')
const multer = require('multer')

const dateController = require('./controller/dateController') 
// routes
const routes = require('./routes')

// middleware
const dbConnectionMiddleware = require('./middleware/is-database-connected')

const app = express()

class Application {
    constructor() {
        this.setBodyParserConfig()
        // this.setMulterCongif()
        this.setStaticDirectories()
        this.setCorsConfig()
        this.errorHandler()
        this.setMulterCongifForProfileImage()
        this.setupRoutes()
        this.setupServer()
    }


    async setupServer() {
            app.listen(config.port)
            console.log('Localhost:' + config.port)            
    }

    setupRoutes() {
        app.use('/api', dbConnectionMiddleware, routes)
    }

    setBodyParserConfig() {
        app.use(bodyParser.json())
        app.use((req, res, next) => {
            res.setHeader("Last-Modified", new Date().toUTCString());
            next();
        });
    }

    errorHandler() {
        app.use((error, req, res, next) => {
            console.log('\x1b[36m', "Error : ", error)
            const statusCode = error.statusCode || 500
            const messages = error.message
            const data = error.data
            res.status(statusCode).json({ messages, data })
        })
    }

    setCorsConfig() {
        app.use(cors(config.cors))
    }

    setMulterCongif() {
        // for extracting form data from client and saving images
        const diskStorage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, 'public/images')
            },
            filename(req, file, cb) {
                cb(null, Date.now().toString() + '-' + file.originalname)
            }
        })

        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }

        app.use(multer({ storage: diskStorage, fileFilter }).single('image'))
    }

    setMulterCongifForProfileImage() {
        // for extracting form data from client and saving images
        const diskStorage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, 'public/images')
            },
            filename(req, file, cb) {
                const mimeTpe = file.mimetype.split('/')[1]
                cb(null, req.body.TU_FUserName + '-' + Date.now().toString() + '.' + mimeTpe)
            }
        })

        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
        app.use(multer({ storage: diskStorage, fileFilter }).single('profileImage'))
    }

    setStaticDirectories() {
        app.use('/api/public/images', express.static('public/images'))
    }
}

module.exports = Application