export default {
    computed: {
        profileImagePath() {
            return this.$store.getters['login/getUserData']().TU_FPicAdd1
        }
    }
}