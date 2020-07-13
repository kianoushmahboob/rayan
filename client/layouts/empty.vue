<template>
  <v-app>
    <!-- <HeaderManager /> -->
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./../components/layouts/auth/Footer";

export default {
  middleware: "init-auth",
  props: {
    source: String
  },
  components: {
    Footer,
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    loggout() {
      this.$store.dispatch("loggout");
    }
  }
};
</script>