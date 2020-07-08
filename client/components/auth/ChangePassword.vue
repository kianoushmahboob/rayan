<template>
  <div>
    <v-container fluid class="containerForgetPassword ltr">
      <v-row>
        <v-col class="relative" cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <p class="text-center">
                <!-- <img src="../assets/earth.png" /> -->
              </p>
            </v-col>

            <v-col cols="12" class="pt-0">
              <h2>لورم ایپسوم</h2>
              <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،</p>
            </v-col>
            <v-col>
              <NuxtLink tag="button" type="button" to="/">خانه</NuxtLink>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <form @submit.prevent="submit" class="rtl">
            <ResetPassword :TU_FUserName="TU_FUserName" :changePasswordMode="true" />
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

import ResetPassword from "./ResetPassword";
import "./../../assets/sass/components/auth/ForgetPassword.scss";

export default {
  layout: "auth",
  middleware: 'is-auth',

  data() {
    return {
    };
  },
  components: {
    ResetPassword
  },
  computed: {
    TU_FUserName() {
      return this.$store.getters['login/getUserData']().TU_FUserName
    }
  }
};
</script>
