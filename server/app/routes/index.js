const express = require('express')

const authRoutes = require('./auth/index')
const userRoutes = require('./user/index')
const defaultsRoutes = require('./default/index')

const router = express.Router()

const dbConnectionMiddleware = require('./../middleware/is-database-connected')


// adding /auth/index.js routes
router.use(dbConnectionMiddleware, authRoutes)
router.use(dbConnectionMiddleware, defaultsRoutes)
router.use(dbConnectionMiddleware, userRoutes)

module.exports = router
