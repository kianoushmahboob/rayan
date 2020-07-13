const sql = require('mssql')
const autoBind = require('auto-bind')

const config = {
    server: "localhost",
    database: "DB_Rayan",
    user: "sa",
    password: "Mssql2014",
    options: {
        "enableArithAbort": true,
        encrypt: false,
    }
}

// const config = {
//     server: "88.198.83.18",
//     database: "_DB_Rayan",
//     user: "Rayan",
//     password: "Mssql2017",
//     options: {
//         "enableArithAbort": true,
//         encrypt: false,
//     },
//     // pool: {
//         // max: 100,
//         // min: 5,
//         // idleTimeoutMillis: 3000
//     // }
// }

class Model {

    constructor () {
        autoBind(this)
        this.config = config
        this.Database = null
        this.isConnect = null
        this.sql = sql
        this.setupPool()
    }

    async setupPool() {
        try {
            this.Database = await new sql.ConnectionPool(this.config)
            await this.Database.connect()
        } catch (error) {
            console.log(error)
        }
    }

    async checkConnection() {
        try {
            this.Database = await new sql.ConnectionPool(this.config)
            await this.Database.connect()
            return true
        } catch (error) {
            return false
        }
    }

    async getTableSchema(tableName) {
        try {
            const result = await this.Database.request()
                .query(`Select * From [dbo].[UFN_SchemaTable]('${tableName}') as shcema`)

            let data = {}
            for (const defalut of result.recordset) {
                let defaultValue
                if (defalut.Defs === '0') {
                    defaultValue = 0
                } else if (defalut.Defs === "''") {
                    defaultValue = ''
                } else if (defalut.Defs == null) {
                    defaultValue = null
                }
                data[defalut.Keys] = defaultValue
            }
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async UFN_Coding(tableName, Year = 0) {
        try {
            const result = await this.Database.request()
                .query(`select  DBO.UFN_Coding('${tableName}', ${Year}) as code`)

            return result.recordset[0].code
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = Model