require('dotenv').config()
global.config = require('./config')

const app = require('./app')
new app()