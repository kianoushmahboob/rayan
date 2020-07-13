<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <Login />
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "./../../components/auth/Login";

export default {
  layout: "empty",
  middleware: "not-auth",
  components: {
    Login
  }
};
</script>