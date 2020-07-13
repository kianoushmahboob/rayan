export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters['login/isAuthenticated']
        }
    }
}