<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <Register :userSchema="userSchema" />
    </v-flex>
  </v-layout>
</template>

<script>
import Register from "./../../components/auth/Register";

export default {
  layout: "empty",
  middleware: "not-auth",
  async asyncData({ app, store }) {
    try {
      // get  users schema data
      const data = await app.$axios.$get("/user/get-schema");
      return {
        userSchema: data.userSchema
      };
    } catch (error) {
      // console.log(error)
    }
  },
  components: {
    Register
  }
};
</script>