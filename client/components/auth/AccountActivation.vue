<template>
  <div>
    <v-container fluid class="containerLogin ltr">
      <v-row>
        <v-col class="relative" cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <p class="text-center">
                <img src="~assets/images/earth.png" />
              </p>
            </v-col>

            <v-col cols="12" class="pt-0">
              <h2>لورم ایپسوم</h2>
              <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،</p>
            </v-col>
            <v-col>
              <NuxtLink tag="button" type="button" to="/register" v-if="!isAuthenticated">ثبت نام</NuxtLink>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <form @submit.prevent="submit" class="rtl">
            <v-row class="rowLogin">
              <v-col cols="12">
                <h2 class="text-center">فعال سازی حساب کاربری</h2>
              </v-col>
              <v-col cols="12" md="12" class="custompaddinLogin">
                <Input v-model="code" lable="کد فعال سازی" name="TU_FPassWord" required icon="user"/>
              </v-col>
              <v-row class="custompaddinLogin">
                <v-col cols="12">
                  <button class="button" type="submit">فعال سازی</button>
                </v-col>
              </v-row>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import "./../../assets/sass/components/auth/Login.scss";

export default {
  layout: "auth",

  data() {
    return {
      code: "",
      pageTitle: "Active Account",
      rememberMeCheckbox: false,
      TU_FUserName: "",
      TU_FPassWord: ""
    };
  },
  // computed: {
  //     user() {
  //         return this.$store.getters.getUserData
  //     }
  // },
  methods: {
    async submit() {
      this.checkActivationCode();
    },
    async createActivationCode() {
      try {
        const response = await this.$authAxios.$post("/create-active-code");
        console.log(response);
      } catch (error) {
        this.showResponseErrors(error);
      }
    },
    async checkActivationCode() {
      try {
        const response = await this.$authAxios.$post("/check-active-code", {
          code: this.code
        });
        this.showResponseSuccessMessages(response);
        this.$store.dispatch("login/setActiveUser");
        this.$router.replace("/");
      } catch (error) {
        this.showResponseErrors(error);
      }
    }
  },
  async created() {
    this.infoToast("کد فعال سازی اس ام شده را وارد کنید");
    this.createActivationCode();

    // this.createActivationCode()
  }
};
</script>

<style>
</style>
