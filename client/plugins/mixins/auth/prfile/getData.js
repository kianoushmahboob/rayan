export default {
    data() {
        return {
            show: false,
            defaults: [],
            primitiveUserData: {},
            userBmans: [],
            users: [],
            headers: {
                defaults: "123,124,122,125,110,126,121,120"
            },
            creator: '',
        };
    },
    methods: {
        async getData(status, userId = null) {
            try {
                let data
                let url 
                let needDefaults = false

                if (status == 'edit.other') {
                    url =  "/user/" + userId
                    needDefaults = true
                }
                if (status == 'edit.mySelf') {
                    url =   "/user/" + this.$store.getters['login/getUserData']().TU_FID
                    needDefaults = true
                }
                if(status == 'insert') {
                    url =   '/defaults/insert-user-form'
                    needDefaults = true
                } 
                if(status == "table.init") {
                    url =   '/get-users?table=true'
                    needDefaults = true
                }
                 if(status == "table.init.noUsers") {
                    url = '/get-users?table=false'
                    needDefaults = true
                }
                data = await this.$authAxios.$get(
                    url,
                    {
                        headers: {
                            defaults : needDefaults ? this.headers.defaults : null
                        }
                    }
                );

                return data

            } catch (error) {
                console.log(error)
                this.showResponseErrors(error);
            }
        }
    },
}