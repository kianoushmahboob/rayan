<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <ChangePassword />
    </v-flex>
  </v-layout>
</template>

<script>
import ChangePassword from "./../../components/auth/ChangePassword";

export default {
  layout: "auth",
  middleware: "is-auth",

  components: {
    ChangePassword
  }
};
</script>