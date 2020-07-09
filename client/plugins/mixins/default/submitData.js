export default {
    methods: {
        // arg default data
        async insert(data, TD_FID_Group) {
            try {
                data.TD_FID_Group = TD_FID_Group
                data = await this.$authAxios.$post('/default', data);
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        // arg default data
        async update(data) {
            try {
                data = await this.$authAxios.$patch('/default', data);
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        // arg default id
        async delete(defaultId) {
            try {
                // data = await this.$authAxios.$delete('/default', { id: defaultId });
                console.log('delete id', defaultId)
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        async submit(status, data, TD_FID_Group = 0) {
            this.$store.dispatch("tableRefresh/refreshStart");

            if (status == "insert") {
                await this.insert(data, TD_FID_Group)
            } else if (status == "edit") {
                await this.update(data)
            } else if (status == "delete") {
                await this.delete(data)
            }
            this.$store.dispatch("tableRefresh/refreshStop");

        }
    },
}