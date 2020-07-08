// require configs ....
const database = require('./database')
const cors = require('./cors')

const configs = {
    port: process.env.APPLICATION_PORT,
    database,
    cors,
}

module.exports = configs