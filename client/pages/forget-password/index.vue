<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <ForgetPassword />
    </v-flex>
  </v-layout>
</template>

<script>
import ForgetPassword from "./../../components/auth/ForgetPassword";

export default {
  layout: "empty",
  middleware: "not-auth",

  components: {
    ForgetPassword
  }
};
</script>