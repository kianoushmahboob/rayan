export default {
  data() {
    return {
    }
  },
  methods: {
    async getData(mode, defaultId = 0, groupId = 0) {
      try {
        let data
        let url

        if (mode == 'default.insert' || mode == 'default.init') {
          url = "/default/" + groupId + "/init?mode=" + mode
        }
        if (mode || 'default.children') {
          url = "/default/" + defaultId + "/init?mode=" + mode

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