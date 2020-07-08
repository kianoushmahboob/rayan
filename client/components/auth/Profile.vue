<template>
  <div>
    <!-- <ProfileHeaderManager @changeEditMode="changeEditMode" @submit="submit" @cancel="cancel" /> -->
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <client-only placeholder="Datapicker">
          <div>
            <v-container class="pt-0 ProfileContainer">
              <v-row class="custompadding rtl">
                <v-col cols="10" class="profileTitle">
                  <h2>{{ title }}</h2>
                  <!-- <button @click="getData">get data</button> -->
                </v-col>
                <v-col cols="2" class="profileImg">
                  <img :src="setImageUrl(user.TU_FPicAdd1)" />
                  <div v-if="formStatus !== 'show'" class="profileOverlay">
                    <img src="/delete.png" class="deleteProfileImg" @click="deleteImageProfile" />
                  </div>
                </v-col>
                <label
                  v-if="formStatus !== 'show'"
                  for="upload-photo-profile"
                  class="profileFileLable"
                >ویرایش عکس</label>
                <input
                  type="file"
                  ref="profileImage"
                  name="photo"
                  id="upload-photo-profile"
                  class="profileFileInp"
                />
              </v-row>

              <v-col cols="12" md="12" class="rtl pt-0">
                <v-row class="custompadding">
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-0">
                    <Input
                      lable="نام کاربری *"
                      icon="user"
                      :readonly="formStatus == 'insert' ? editMode: true"
                      name="TU_FUserName"
                      v-model="user.TU_FUserName"
                      required
                      :maxLength="20"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-0">
                    <Input
                      lable="نام"
                      :readonly="editMode"
                      name="TU_FName"
                      v-model="user.TU_FName"
                      required
                      :maxLength="20"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-0">
                    <Input
                      lable="نام خانوادگی"
                      :readonly="editMode"
                      v-model="user.TU_FFamil"
                      name="TU_FFamil"
                      required
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-0">
                    <Input
                      lable="کدملی"
                      :readonly="editMode"
                      v-model="user.TU_FCodeMeli"
                      name="TU_FCodeMeli"
                      icon="id"
                      maxlength="11"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="کد شخص"
                      :readonly="editMode"
                      v-model="user.TU_FCode"
                      name="TU_FCode"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Datapicker
                      lable="تاریخ تولد"
                      required
                      dateType="date"
                      :readonly="editMode"
                      v-model="user.TU_FDateBirth"
                      name="TU_FDateBirth"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Select
                      lable="جنسیت"
                      :defaults="defaults"
                      :defaultCode="122"
                      :readonly="editMode"
                      idField="TD_FID"
                      nameField="TD_FName"
                      v-model="user.TU_FID_Sex"
                      name="TU_FID_Sex"
                      required
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Select
                      :defaultCode="125"
                      :defaults="defaults"
                      lable="رسته شغلی"
                      :readonly="editMode"
                      v-model="user.TU_FID_Bussines"
                      name="TU_FID_Bussines"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Select
                      lable="استان"
                      :defaultCode="123"
                      :defaults="defaults"
                      :readonly="editMode"
                      v-model="user.TU_FID_City1"
                      name="TU_FID_City1"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Select
                      lable="شهر"
                      :defaultCode="124"
                      :defaults="defaults"
                      :readonly="editMode"
                      v-model="user.TU_FID_City2"
                      :rel="user.TU_FID_City1"
                      name="TU_FID_City2"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="موبایل1"
                      :readonly="editMode"
                      v-model="user.TU_FMobile1"
                      name="TU_FMobile1"
                      icon="mobile"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="موبایل2"
                      :readonly="editMode"
                      v-model="user.TU_FMobile2"
                      name="TU_FMobile2"
                      icon="mobile"
                    />
                  </v-col>

                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="تلفن1 "
                      :readonly="editMode"
                      v-model="user.TU_FTell1"
                      name="TU_FTell1"
                      icon="phone"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="تلفن2"
                      :readonly="editMode"
                      v-model="user.TU_FTell2"
                      name="TU_FTell2"
                      icon="phone"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="کد پستی"
                      :readonly="editMode"
                      v-model="user.TU_FPost"
                      name="TU_FPost"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="ایمیل"
                      :readonly="editMode"
                      v-model="user.TU_FEmail"
                      name="TU_FEmail"
                      icon="mail"
                    />
                  </v-col>

                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="وب سایت"
                      :readonly="editMode"
                      v-model="user.TU_FWebsite"
                      name="TU_FWebsite"
                      icon="internet"
                    />
                  </v-col>

                  <v-col cols="6" md="3" sm="4" xs="6 " class="mt-1">
                    <Input
                      lable="شماره حساب"
                      :readonly="editMode"
                      v-model="user.TU_FAccount"
                      name="TU_FAccount"
                      icon="card"
                    />
                  </v-col>
                  <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                    <Input
                      lable="شماره کارت"
                      :readonly="editMode"
                      v-model="user.TU_FAccountCard"
                      name="TU_FAccountCard"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="mt-1">
                    <Input
                      lable="آدرس 1"
                      :readonly="editMode"
                      v-model="user.TU_FAdd1"
                      name="TU_FAdd1"
                      icon="address"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="mt-1">
                    <Input
                      lable="آدرس 2"
                      :readonly="editMode"
                      v-model="user.TU_FAdd2"
                      name="TU_FAdd2"
                      icon="address"
                    />
                  </v-col>
                </v-row>
                <transition name="fade">
                  <v-row class="custompadding" v-if="show" id="hide">
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Select
                        :defaultCode="121"
                        :defaults="defaults"
                        lable="عنوان"
                        :readonly="editMode"
                        v-model="user.TU_FID_Caption"
                        name="TU_FID_Caption"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Select
                        :defaultCode="120"
                        :defaults="defaults"
                        lable="گروه"
                        :readonly="editMode"
                        v-model="user.TU_FID_Group"
                        name="TU_FID_Group"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Select
                        :defaultCode="126"
                        :defaults="defaults"
                        lable="روش آشنایی"
                        :readonly="editMode"
                        v-model="user.TU_FID_Relation"
                        name="TU_FID_Relation"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Select
                        lable="مسئول"
                        :readonly="editMode"
                        :defaults="users"
                        idField="TU_FID"
                        nameField="TU_FNameFamil"
                        v-model="user.TU_FUserBman"
                        name="TU_FUserBman"
                      />
                    </v-col>
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Select
                        :defaultCode="110"
                        :defaults="defaults"
                        lable="گروه دسترسی"
                        :readonly="editMode"
                        v-model="user.TU_FID_Access"
                        name="TU_FID_Access"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Checkbox
                        lable="فعال بودن"
                        :readonly="editMode"
                        v-model="user.TU_FActive"
                        name="TU_FActive"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Datapicker
                        lable="تاریخ خروج"
                        dateType="datetime"
                        :readonly="user.TU_FActive == '1'"
                        v-model="user.TU_FDateExit"
                        name="TU_FDateExit"
                      />
                    </v-col>
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Checkbox
                        lable="کاربر بودن"
                        :readonly="editMode"
                        v-model="user.TU_FIsUser"
                        name="TU_FIsUser"
                      />
                    </v-col>
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Checkbox
                        lable="بایگانی"
                        required
                        :readonly="editMode"
                        v-model="user.TU_FArchive"
                        name="TU_FArchive"
                      />
                    </v-col>
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Input
                        lable="شرح فعالیت"
                        :readonly="editMode"
                        v-model="user.TU_FWork"
                        name="TU_FWork"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Input
                        lable="مدیریت"
                        :readonly="editMode"
                        v-model="user.TU_FManager"
                        name="TU_FManager"
                      />
                    </v-col>
                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Textarea
                        lable="شرح فرد"
                        required
                        :readonly="editMode"
                        v-model="user.TU_FComment"
                        name="TU_FComment"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Input
                        lable="کاربر ایجاد کننده"
                        :readonly="true"
                        :value="creator || ''"
                        name="TU_FUserReg"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Datapicker
                        lable="تاریخ ثبت"
                        :readonly="true"
                        v-model="user.TU_FDateReg"
                        name="TU_FDateReg"
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Datapicker
                        lable="ساعت ثبت"
                        dateType="time"
                        :readonly="editMode"
                        v-model="user.TU_FTimeReg"
                        name="TU_FTimeReg"
                      />
                    </v-col>

                    <!-- <v-col cols="6" md="3" sm="4" xs="6">
                <Input
                  lable="نوع کاربر"
                  :readonly="editMode"
                  v-model="user.TU_FLinkID"
                  name="TU_FLinkID"
                />
                    </v-col>-->

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Datapicker
                        lable="تاریخ آخرین بازدید "
                        v-model="user.TU_FLoginLastDate"
                        :readonly="true"
                        name
                      />
                    </v-col>

                    <v-col cols="6" md="3" sm="4" xs="6" class="mt-1">
                      <Datapicker
                        lable="زمان آخرین بازدید "
                        v-model="user.TU_FLoginLastTime"
                        :readonly="true"
                        name
                      />
                    </v-col>
                  </v-row>
                </transition>
              </v-col>

              <div v-show="isUser">
                <v-row>
                  <v-col cols="12" :class="['more text-center' , {'rotate': show == true}]">
                    <img src="/downarrow.png" class="animationMoreBtn" v-on:click="show = !show" />
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </div>
        </client-only>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import selectSetValuesMixins from "./../../plugins/mixins/UI-mixins/selectSetValues";
// import ProfileHeaderManager from "./../layouts/auth/ProfileHeaderManager";

import "./../../assets/sass/components/auth/Profile.scss";

export default {
  props: [
    "user",
    "users",
    "defaults",
    "primitiveUserData",
    "formStatus",
    "creator",
    "submit",
    "cancel",
    "editMode",
    "editMySelf"
  ],
  data() {
    return {
      show: false,
      title: ""
    };
  },
  mounted() {
    this.setProfileTitle(this.formStatus);
  },
  methods: {
    changeEditMode(e) {
      this.editMode = e;
    },
    async formSubmit() {
      try {
        let result;
        const data = this.generateFormData(this.user);
        this.appendImageProfileFormData(data, "profileImage", "profileImage");
        if (this.formStatus === "edit") {
          result = await this.$authAxios.$patch("/update-profile", data);
          this.user.TU_FPicAdd1 = result.otherData.TU_FPicAdd1;
          // this.$store.dispatch("login/updateProfile", result.otherData);
          this.showResponseSuccessMessages(result);
          this.$emit("done");
        }
        if (this.formStatus === "insert") {
          result = await this.$authAxios.$post("/insert-user", data);
          this.showResponseSuccessMessages(result);
          this.$emit("done");
        }
      } catch (error) {
        this.$emit("failed", this.formStatus);
        let code;
        if ((code = error.response.data.otherData)) {
          this.infoToast(
            " کد کاربری شما تکراری میباشد لطفا از کد " +
              code.TU_FCode +
              " استفاده نمایید ",
            { duration: 15000 }
          );
        } else {
          this.showResponseErrors(error);
        }
      }
    },
    fromCancel() {
      // const TU_FPicAdd1 = this.user.TU_FPicAdd1
      // this.user = { ...this.primitiveUserData };
      // this.user.TU_FPicAdd1 = TU_FPicAdd1
    },
    setProfileTitle(status) {
      if (status == "insert") {
        this.title = "ایجاد کاربر";
      } else if (status == "show") {
        this.title = "مشاهده کاربر";
      } else if (status == "edit") {
        this.user = { ...this.primitiveUserData };
        this.title = "ویرایش اطلاعات کاربر";
      }
    },
    // حذف عکس پروفایل
    deleteImageProfile() {
      this.user.TU_FPicAdd1 = "";
    }
  },
  watch: {
    // ست کردن تاریخ خروج براساس فعال بودن یا نبودن چک باکس
    "user.TU_FActive"(newValue) {
      if (newValue == 0) {
        this.user.TU_FDateExit = this.currrentDate.date;
      } else if (newValue == 1) {
        this.user.TU_FDateExit = "";
      }
    },
    submit(submited) {
      this.formSubmit();
    },
    cancel(canceled) {
      if (this.editMySelf) {
        this.fromCancel();
      }
    },
    editMode(newValue) {
      this.changeEditMode(newValue);
    },
    formStatus(status) {
      this.setProfileTitle(status);
    }
  }
};
</script>
