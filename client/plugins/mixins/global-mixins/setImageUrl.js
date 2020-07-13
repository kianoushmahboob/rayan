export default {
    methods: {
        setImageUrl(imagePath) {
            return process.env.SERVER_BASE_URL + '/' + imagePath
        }
    }
}