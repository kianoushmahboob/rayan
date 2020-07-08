<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <AccountActivation />
    </v-flex>
  </v-layout>
</template>

<script>
import AccountActivation from "./../../components/auth/AccountActivation";

export default {
  layout: "auth",
  middleware: ["init-auth", "is-auth-not-active"],
  components: {
    AccountActivation
  }
};
</script>