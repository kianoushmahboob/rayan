<template>
  <Slider />
</template>

<script>
import Slider from "~/components/UI/slider";

export default {
  middleware: ["init-auth"],
  layout: "auth",
  components: {
    Slider
  },
  created() {}
};
</script>
