export default {
    computed: {
        isUser() {
            return this.$store.getters['login/isUser']()
        }
    }
}