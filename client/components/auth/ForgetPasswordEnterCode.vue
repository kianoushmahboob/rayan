<template>
  <v-row class="rowForgetPassword">
    <v-col cols="12">
      <h2 class="text-center">فراموشی رمز عبور</h2>
    </v-col>
    <v-col cols="12" md="12" class="custompaddinForgetPassword">
      <Input v-model="code" lable="کد" name="code" required icon="id" />
      <p class="mt-5">
        کد ارسال شده به کاربری
        <span>{{ TU_FUserName }}</span> را وارد کنید
      </p>
    </v-col>
    <v-col cols="12" md="12" class="custompaddinForgetPassword"></v-col>
    <v-row class="custompaddinForgetPassword">
      <v-col cols="12">
        <button @click.prevent="sendResetToken">تایید کد</button>
        <button @click.prevent="changeUsername" class="btnChangePassword">ویرایش نام کاربری</button>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import "./../../assets/sass/components/auth/ForgetPassword.scss";

export default {
  layout: "auth",
  props: ["TU_FUserName", "resetToken"],
  data() {
    return {
      code: ""
    };
  },
  methods: {
    async sendResetToken() {
      try {
        const response = await this.$axios.$post("/check-reset-password", {
          TU_FUserName: this.TU_FUserName,
          resetToken: this.resetToken,
          code: this.code
        });
        this.$emit("changePassword");
      } catch (error) {
        this.showResponseErrors(error);
      }
    },
    changeUsername() {
      this.$emit("changeComponent", -1);
    }
  }
};
</script>
