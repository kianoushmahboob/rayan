// ایجاد FormData و افز.دن عکس به آن
// refsName -> this.$refs.refsName in form component
export default {
    methods: {
        appendImageProfileFormData(fd, refsName) {
            const file = this.$refs[refsName].files[0];

            if (file) {
                if (this.user.TU_FUserName) {
                    fd.append(refsName, file, file.name);
                }
            }
        },
        generateFormData(obj) {
            const formData = new FormData();
            for (const key in obj) {
                formData.append([key], obj[key]);
            }
            return formData;
        },
    }
}