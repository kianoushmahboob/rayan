<template>
  <v-app>
    <Header />
    <!-- <HeaderManager /> -->
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Header from "./../components/layouts/auth/Header";
import Footer from "./../components/layouts/auth/Footer";

export default {
  middleware: "init-auth",
  props: {
    source: String
  },
  components: {
    Header,
    Footer,
  },
  data: () => ({
    drawer: null
  }),
  // computed: {
  //   isAuthenticated() {
  //     return this.$store.getters.isAuthenticated;
  //   }
  // },
  methods: {
    loggout() {
      this.$store.dispatch("loggout");
    }
  }
};
</script>