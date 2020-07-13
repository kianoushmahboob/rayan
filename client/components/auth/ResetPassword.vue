<template>
  <v-row class="rowForgetPassword">
    <v-col cols="12">
      <h2 class="text-center">تغییر رمز عبور</h2>
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword" v-if="changePasswordMode">
      <Input v-model="oldPassword" lable="رمز عبور فعلی" name="oldPassword" required />
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword">
      <Input v-model="TU_FPassWord" lable="رمز عبور" name="TU_FPassWord" required />
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword">
      <Input v-model="confirmPassword" lable="تکرار رمز عبور" name="confirmPassword" required />
    </v-col>

    <v-col cols="12" md="12" class="custompaddinForgetPassword"></v-col>
    <v-row class="custompaddinForgetPassword">
      <v-col cols="12">
        <button @click.prevent="changePassword">تغییر رمز</button>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import "./../../assets/sass/components/auth/ForgetPassword.scss";

export default {
  layout: "auth",

  props: ["TU_FUserName", "changePasswordMode"],
  data() {
    return {
      TU_FPassWord: "",
      confirmPassword: "",
      oldPassword: "",
      checkbox1: true
    };
  },
  methods: {
    async changePassword() {
      try {
        let data;
        if (this.changePasswordMode) {
          data = {
            TU_FUserName: this.TU_FUserName,
            TU_FPassWord: this.TU_FPassWord,
            confirmPassword: this.confirmPassword,
            oldPassword: this.oldPassword,
            changePassword: true
          };
        } else {
          data = {
            TU_FUserName: this.TU_FUserName,
            TU_FPassWord: this.TU_FPassWord,
            confirmPassword: this.confirmPassword,
            changePassword: false
          };
        }
        const response = await this.$axios.$post("/change-password", data);
        if (response.status == 201) {
          this.successToast("رمز عبور شما با موفیقت تغییر یافت");
          this.$router.push("/login");
        }
      } catch (error) {
        this.showResponseErrors(error);
      }
    }
  }
};
</script>
