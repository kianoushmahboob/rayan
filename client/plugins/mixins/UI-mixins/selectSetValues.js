export default {
    methods: {
        setValues(defaultCode) {
            const from = this.defaults.filter(
                el => {
                    return el.TD_FCode === defaultCode
                }
            )
            this.from = from[0].children
            // console.log(this.from)
            this.mainData = from[0].children
        }
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