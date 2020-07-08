export default {
    data() {
        return {
            globalOptions: {
                action: []
            }
        }
    },
    created() {
        // add any option you want
        this.addOption({ theme: 'bubble' })
        this.addOption({ duration: 5000 })
        this.addOption({ position: "bottom-left" })
        this.addOnClickActions()
    },
    methods: {
        defaultToast(message, options) {
            this.addOption(options)
            this.$toasted.show(message, this.globalOptions)
        },
        successToast(message, options) {
            this.addOption(options)
            this.$toasted.success(message, this.globalOptions)
        },
        infoToast(message, options) {
            this.addOption(options)
            this.$toasted.info(message, this.globalOptions)
        },
        errorToast(message, options) {
            this.addOption(options)
            this.$toasted.error(message, this.globalOptions)
        },
        showResponseErrors(error, options) {
            this.addOption(options)
            error.response.data.mesages.forEach(message => {
                this.$toasted.error(message, this.globalOptions)
            })
        },
        showResponseSuccessMessages(response, options) {
            this.addOption(options)
           response.mesages.forEach(message => {
                this.successToast(message, this.globalOptions)
            })
        },
        clearToast() {
            this.$toasted.clear()
        },
        addOnClickActions() {
            const onClick = {
                text: 'X',
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                }
            }
            this.globalOptions.action.push(onClick)
        },
        addOption(options) {
            this.globalOptions = { ...this.globalOptions, ...options }
        }
    }
}