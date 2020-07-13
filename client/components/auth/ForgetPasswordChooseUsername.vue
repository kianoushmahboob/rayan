<template>
  <v-row class="rowForgetPassword">
    <v-col cols="12">
      <h2 class="text-center">فراموشی رمز عبور</h2>
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword">
      <Input v-model="TU_FUserName" lable="نام کاربری" name="TU_FUserName" required icon="user" />
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword"></v-col>
    <v-row class="custompaddinForgetPassword">
      <v-col cols="12">
        <button @click.prevent="sendCode">ارسال پیامک</button>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import "./../../assets/sass/components/auth/ForgetPassword.scss";

export default {
  layout: "auth",

  data() {
    return {
      TU_FUserName: "",
      checkbox1: true
    };
  },
  methods: {
    async sendCode() {
      try {
        const response = await this.$axios.$post("/reset-password", {
          TU_FUserName: this.TU_FUserName
        });
        if (response.status == 200) {
          const data = {
            resetToken: response.resetToken,
            TU_FUserName: this.TU_FUserName
          };
          this.$emit("resetToken", data);
          this.$emit("changeComponent", +1);
        }
      } catch (error) {
        this.showResponseErrors(error);
      }
    }
  }
};
</script>
