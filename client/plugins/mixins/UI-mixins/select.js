export default {
    props: {
        lable: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        defaults: {
            type: Array,
            required: true
        },
        defaultCode: {
            type: Number
        },
        rel: {
            type: Number
        },
        idField: {
            type: String,
            default: 'TD_FID'
        },
        nameField: {
            type: String,
            default: 'TD_FName'
        },
        relField: {
            type: String,
            default: 'TD_FID_Group'
        },
        lazy: {
            type: Boolean,
            default: false
        },
        required: { 
            type: Boolean,
            default: false
        }
    }, 
    data() {
        return {

        }
    },
    methods: {
        setValues(defaults) {
            if (this.defaultCode) {
                const from = defaults.filter(
                    el => {
                        return el.TD_FCode === this.defaultCode
                    }
                )
                this.from = from[0].children
                this.mainData = from[0].children
            } else {
                this.from = defaults
                this.mainData = defaults
            }
        },
    },
    watch: {
        defaults(newValue) {
            if (newValue) {
                this.setValues(newValue)
            }
        }
    },
    mounted() {      
        if (this.defaults) {
            if (this.defaults.length) {
                this.setValues(this.defaults)
            }
        }
    }
}
