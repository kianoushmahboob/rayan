export default {
  data() {
    return {
    }
  },
  methods: {
    async getDataMixin(mode, categoryId = 0, groupId = 0) {
      try {
        let data
        let url

        if (mode == "insert.init") {
          url = "/category/" + groupId + "?mode=" + mode
        } else if (mode == "show.init" || mode == "update.init") {
          url = "/category/" + categoryId + "?mode=" + mode
        } else if (mode == "children") {
          url = "/category/" + groupId + "?mode=" + mode
        }


        data = await this.$authAxios.$get(
          url
        );
        return data
      } catch (error) {
        console.log(error)
        this.showResponseErrors(error);
      }
    },
  },
}