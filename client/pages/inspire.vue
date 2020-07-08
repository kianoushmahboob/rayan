<template>
  <div>
    <button @click="sendData">sendData</button>
  </div>
</template>


<script>
export default {
  layout: "auth",

  methods: {
    async sendData() {
      try {
        // const response = await this.$axios.$get(
        //   "http://localhost:3000/api/defaults",
        //   {
        //     headers: {
        //       defaults: "123,124"
        //     }
        //   }
        // );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
