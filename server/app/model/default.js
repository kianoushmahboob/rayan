const Model = require('./Model')

class UserModel extends Model {
    constructor () {
        super()
    }

    async findDefaultsByCodeId(codeIds = null) {
        try {
            let results = []
            for (let codeId of codeIds) {
                const result = await this.Database.request()
                    .input('State', this.sql.NVarChar, 'MainGroup')
                    .input('Year', this.sql.Int, process.env.YEAR_ACCOUNTING)
                    .input('FID_Group', this.sql.Int, codeId)
                    .execute('USP_TDefault_Select')
                let masterGruop = result.recordset[0]
                masterGruop.children = []

                let children = await this.getDefaultsChildren(codeId)
                masterGruop.children = children
                results.push(masterGruop)
            }
            return results
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getDefaultsChildren(groupId = 0) {
        try {
            let results = []
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'Combo')
                .input('Year', this.sql.Int, process.env.YEAR_ACCOUNTING)
                .input('FID_Group', this.sql.Int, groupId)
                .execute('USP_TDefault_Select')
            return result.recordsets[0]
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async insert(data) {
        try {
            let RetID
            let RetMsg
            console.log("data", data)

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'Insert')
                .input('TD_FID', this.sql.Int, data.TD_FID)
                .input('TD_FCode', this.sql.Int, data.TD_FCode)
                .input('TD_FName', this.sql.NVarChar, data.TD_FName)
                .input('TD_FCaption', this.sql.NVarChar, data.TD_FCaption)
                .input('TD_FComment', this.sql.NVarChar, data.TD_FComment)
                .input('TD_FValue1', this.sql.Money, data.TD_FValue1)
                .input('TD_FValue2', this.sql.Money, data.TD_FValue2)
                .input('TD_FValue3', this.sql.NVarChar, data.TD_FValue3)
                .input('TD_FOrder', this.sql.Int, data.TD_FOrder)
                .input('TD_FActive', this.sql.TinyInt, data.TD_FActive)
                .input('TD_FShow', this.sql.TinyInt, data.TD_FShow)
                .input('TD_FSystem', this.sql.TinyInt, data.TD_FSystem)
                .input('TD_FDelete', this.sql.TinyInt, data.TD_FDelete)
                .input('TD_FFormType', this.sql.TinyInt, data.TD_FFormType)
                .input('TD_FSubGroup', this.sql.TinyInt, data.TD_FSubGroup)
                .input('TD_FID_Group', this.sql.Int, data.TD_FID_Group)
                .input('TD_FDeleted', this.sql.TinyInt, data.TD_FDeleted)
                .input('TD_FEdited', this.sql.TinyInt, data.TD_FEdited)
                .input('TD_FInserted', this.sql.TinyInt, data.TD_FInserted)
                .input('TD_FDateReg', this.sql.NVarChar, data.TD_FDateReg)
                .input('TD_FYear', this.sql.Int, data.TD_FYear)
                .input('TD_FUserReg', this.sql.BigInt, data.TD_FUserReg)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TDefault_Ins')
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async delete(id) {
        try {
            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('FID', this.sql.BigInt, id)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TDefault_Del')
            console.log("result", result)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findById(id) {
        try {
            let results = []
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'MainGroup')
                .input('Year', this.sql.Int, process.env.YEAR_ACCOUNTING)
                .input('FID_Group', this.sql.BigInt, id)
                .execute('USP_TDefault_Select')
            console.log('result', result)
            return result.recordset[0]
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(data) {
        try {
            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'Update')
                .input('TD_FID', this.sql.Int, data.TD_FID)
                .input('TD_FCode', this.sql.Int, data.TD_FCode)
                .input('TD_FName', this.sql.NVarChar, data.TD_FName)
                .input('TD_FCaption', this.sql.NVarChar, data.TD_FCaption)
                .input('TD_FComment', this.sql.NVarChar, data.TD_FComment)
                .input('TD_FValue1', this.sql.Money, data.TD_FValue1)
                .input('TD_FValue2', this.sql.Money, data.TD_FValue2)
                .input('TD_FValue3', this.sql.NVarChar, data.TD_FValue3)
                .input('TD_FOrder', this.sql.Int, data.TD_FOrder)
                .input('TD_FActive', this.sql.TinyInt, data.TD_FActive)
                .input('TD_FShow', this.sql.TinyInt, data.TD_FShow)
                .input('TD_FSystem', this.sql.TinyInt, data.TD_FSystem)
                .input('TD_FDelete', this.sql.TinyInt, data.TD_FDelete)
                .input('TD_FFormType', this.sql.TinyInt, data.TD_FFormType)
                .input('TD_FSubGroup', this.sql.TinyInt, data.TD_FSubGroup)
                .input('TD_FID_Group', this.sql.Int, data.TD_FID_Group)
                .input('TD_FDeleted', this.sql.TinyInt, data.TD_FDeleted)
                .input('TD_FEdited', this.sql.TinyInt, data.TD_FEdited)
                .input('TD_FInserted', this.sql.TinyInt, data.TD_FInserted)
                .input('TD_FDateReg', this.sql.NVarChar, data.TD_FDateReg)
                .input('TD_FYear', this.sql.Int, data.TD_FYear)
                .input('TD_FUserReg', this.sql.BigInt, data.TD_FUserReg)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TDefault_Ins')
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new UserModel()