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
              <button type="button" name="button">ثبت نام</button>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <form @submit.prevent="submit" class="rtl">
            <!-- <v-col cols="12" md="12" class="custompaddinForgetPassword" v-if="step == 1">
                <div class="form-group form__group field" :class="{ 'form-group--error': false }">
                  <input
                    class="form-control form__field"
                    id="forgetPassword"
                    placeholder="شماره تماس"
                    v-model.trim="userName"
                  />
                  <label for="forgetPassword" class="form__label">نام کاربری</label>
                </div>
              </v-col>

              <v-col cols="12" md="12" class="custompaddinForgetPassword" v-if="step == 2">
                <div class="form-group form__group field" :class="{ 'form-group--error': false }">
                  <input
                    class="form-control form__field"
                    id="confirmForgetPassword"
                    placeholder="شماره تماس"
                    v-model.trim="code"
                  />
                  <label for="confirmForgetPassword" class="form__label">کد</label>
                  <p class="mt-5">
                    کد ارسال شده به شماره
                    <span>{{ userName }}</span> را وارد کنید
                  </p>
                </div>
            </v-col>-->
            <component
              :is="currentComponent"
              @changeComponent="changeComponent"
              @resetToken="setResetToken"
              @changePassword="changePassword"
              @click="changePassword"
              :TU_FUserName="TU_FUserName"
              :resetToken="resetToken"
              :changePasswordMode="false"
            ></component>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ForgetPasswordChooseUsername from "./ForgetPasswordChooseUsername";
import ForgetPasswordEnterCode from "./ForgetPasswordEnterCode";
import ResetPassword from "./ResetPassword";
import "./../../assets/sass/components/auth/ForgetPassword.scss";

export default {
  layout: "auth",

  data() {
    return {
      TU_FUserName: "",
      code: "",
      resetToken: "",
      currentComponent: ForgetPasswordChooseUsername
    };
  },
  methods: {
    changeComponent(e) {
      if (e === 1) {
        this.currentComponent =
          this.currentComponent === ForgetPasswordChooseUsername
            ? ForgetPasswordEnterCode
            : ForgetPasswordChooseUsername;
      }
      if (e === -1) {
        this.currentComponent =
          this.currentComponent === ForgetPasswordChooseUsername
            ? ForgetPasswordEnterCode
            : ForgetPasswordChooseUsername;
      }
    },
    setResetToken(e) {
      this.resetToken = e.resetToken;
      this.TU_FUserName = e.TU_FUserName;
    },
    changePassword() {
      this.currentComponent = ResetPassword;
    }
  }
};
</script>
