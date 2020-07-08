export default {
    head() {
        return {
            title: this.pageTitle,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description' }
            ]
        }
    }
}