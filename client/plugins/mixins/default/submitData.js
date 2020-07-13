export default {
    methods: {
        // arg default data
        async insert(data, TD_FID_Group) {
            try {
                data.TD_FID_Group = TD_FID_Group
                const responseData = await this.$authAxios.$post('/default', data);
                return responseData
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        // arg default data
        async update(data) {
            try {
                const responseData = await this.$authAxios.$patch('/default', data);
                return responseData
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        // arg default id
        async delete(defaultId) {
            try {
                const data = await this.$authAxios.$delete('/default/' + defaultId);
                return data
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        async submitMixin(status, data, TD_FID_Group = 0) {
            try {

                this.$store.dispatch("tableRefresh/refreshStart");

                let result
                if (status == "insert") {
                    result = await this.insert(data, TD_FID_Group)
                } else if (status == "edit") {
                    result = await this.update(data)
                } else if (status == "delete") {
                    result = await this.delete(data)
                }

                if (result) {
                    this.showResponseSuccessMessages(result);
                    await this.updateTable()
                    return true
                }
                this.$store.dispatch("tableRefresh/refreshStop");
                return false

            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
                this.$store.dispatch("tableRefresh/refreshStop");

            }
        }
    }

}           