<template>
  <div>
    <v-container fluid class="containerRegister ltr">
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
              <NuxtLink tag="button" type="button" to="/" v-if="!isAuthenticated">خانه</NuxtLink>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <form @submit.prevent="submit" class="rtl">
            <v-row class="rowRegister">
              <v-col cols="12 registerTitle">
                <h2 class="text-center">ثبت نام</h2>
              </v-col>
              <v-row class="custompaddin">
                <v-col cols="12" md="6">
                  <Input v-model="userSchema.TU_FName" lable="نام" name="TU_FName" required icon="user" />
                </v-col>

                <v-col cols="12" md="6">
                  <Input
                    v-model="userSchema.TU_FFamil"
                    lable="نام خانوادگی"
                    name="TU_FFamil"
                    required
                    icon="user"
                  />
                </v-col>
              </v-row>

              <v-col cols="12" md="12" class="custompaddin">
                <Input
                  v-model="userSchema.TU_FUserName"
                  lable="نام کاربری"
                  name="TU_FUserName"
                  required
                  icon="user"
                />
              </v-col>

              <v-row class="custompaddin">
                <v-col cols="12" md="6">
                  <Input
                    v-model="userSchema.TU_FMobile1"
                    lable="شماره تماس همراه"
                    name="TU_FMobile1"
                    required
                    icon="mobile"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <Input v-model="userSchema.TU_FEmail" lable="ایمیل" name="TU_FEmail" required icon="mail" />
                </v-col>
              </v-row>

              <v-row class="custompaddin">
                <v-col cols="12" md="6">
                  <Input
                    v-model="userSchema.TU_FPassWord"
                    lable="رمزعبور"
                    name="TU_FPassWord"
                    required
                    icon="lock"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <Input
                    v-model="confirmPassword"
                    lable="تکرار رمز عبور"
                    name="confirmPassword"
                    required
                    icon="lock"
                  />
                </v-col>
              </v-row>
              <v-row class="custompaddin">
                <v-col cols="12">
                  <button class="button" type="submit">ثبت نام</button>
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
import "./../../assets/sass/components/auth/Register.scss";

export default {
  layout: "auth",
  props: ["userSchema"],
  data() {
    return {
      pageTitle: "Register",
      TU_FName: "",
      TU_FFamil: "",
      TU_FUserName: "",
      TU_FMobile1: "",
      TU_FEmail: "",
      TU_FPassWord: "",
      confirmPassword: "",
      submitStatus: null
    };
  },
  methods: {
    async submit() {
      try {
        let userData = {...this.userSchema, confirmPassword: this.confirmPassword};
        

        const result = await this.$axios.$post("/register", userData);
        this.showResponseSuccessMessages(result)
        this.$router.push("/login");
      } catch (error) {
        this.showResponseErrors(error);
      }
    }
  },
  created() {
    console.log(this.userSchema);
  }
};
</script>

