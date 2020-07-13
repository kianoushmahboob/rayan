<template>
  <div>
    <!-- <Profile
      :user="user"
      :primitiveUserData="primitiveUserData"
      :defaults="defaults"
      :users="users"
      formStatus="edit"
      :creator="creator"
    /> -->
  </div>
</template>

<script>
// import Profile from "./../../components/auth/Profile";
// import getDataMixin from "./../../plugins/mixins/auth/prfile/getData";

export default {
  // layout: "auth",
  // middleware: ["init-auth", "is-auth", "is-user"],
  // mixins: [getDataMixin],
  // validate({ params }) {
  //   if (!isNaN(params.id)) {
  //     const numberId = Number(params.id);
  //     if (Number.isInteger(numberId)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // },
  // components: {
  //   Profile
  // },
  // data() {
  //   return {
  //     editMode: true,
  //     profileChangeSubmitStatus: ""
  //   };
  // },
  // async mounted() {
  //   const userId = this.$route.params.id;
  //   // get data from backend methods in getDataMixin
  //   const data = await this.getData("edit.other", userId);
  //   this.user = data.user;
  //   this.primitiveUserData = { ...data.user };
  //   this.defaults = data.defaults;
  //   this.users = data.users;
  //   this.creator = data.creator;
  // }
};
</script>