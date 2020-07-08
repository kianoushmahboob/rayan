export default {
    methods: {
        async insert(data) {
            try {
                data = await this.$authAxios.$post('/default', data);
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        async update(data) {
            try {
                data = await this.$authAxios.$patch('/default', data);
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        async delete(defaultId) {
            try {
                data = await this.$authAxios.$delete('/default', {id: defaultId});
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
        submit(status, data) {
            if (status == "insert") {
                this.insert(data)
            } else if (status == "edit") {
                this.update(data)
            } else if (status == "delete") {
                this.delete(data.TD_FID)
            }
        }
    },
}