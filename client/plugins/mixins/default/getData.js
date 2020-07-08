export default {
    data() {
        return {
        }
    },
    methods: {
        async getData(mode, defaultId = null) {
            try {
                let data
                let url 

                if (mode == 'default.insert' || mode == 'default.init') {
                    url = "/default?mode=" + mode
                }  

                if (mode == 'default.children') {
                    url = "/default/" + defaultId
                }
                data = await this.$authAxios.$get(
                    url
                );
                return data
            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        },
    },
}