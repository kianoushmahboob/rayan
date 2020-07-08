export default {
    computed: {
        currrentDate() {
            return this.$store.getters['date/getCurrentDate']
        }
    }
}