<template>
  <div>
    <HeaderManager
      @submit="submitEvent"
      @cancel="cancelEvent"
      @insert="headerManagerEventHandler('insert')"
      @show="headerManagerEventHandler('show')"
      @edit="headerManagerEventHandler('edit')"
      @delete="headerManagerEventHandler('delete')"
      :buttonVisibility="components.headerManager.status"
      :generalHeaderStatus="components.headerManager.generalStatus"
    />
    <Profile
      v-if="components.profile.show"
      :user="user"
      :primitiveUserData="user"
      :defaults="defaults"
      :users="userBmans"
      :formStatus="components.profile.actionStatus"
      :creator="creator"
      :submit="submit"
      :cancel="cancel"
      :editMode="components.profile.inputsReadonly"
      @done="done"
      @failed="failed"
    />
    <Table
      :v-if="components.table.show"
      :data="allUsers"
      :dataSchema="tableSchema"
      :clearRows="components.table.unSelect"
      :checkboxDisabled="components.table.checkboxEnabled"
      @selectedRowChanged="selectedRowChanged"
      @refresh="getNewUsers"
    />
  </div>
</template>


<script>
// components.profile.actionStatus : insert || edit تعیین وضعیت عملیات برای پروفایل
// headerStatus: insert || edit | ... تعیین وضعیت  دکمه های هدر
// generalHeaderStatus: user || card | ... تعیین وضعیت  کلی هدر
// clearRows: true || false پاک کردن سطر های انتخاب شده جدول
// EnableProfileInputs: true || false فعال یا غیر فعال کردن فیلد های داخل پروفایل

import Table from "./../../components/user/Table";
import Profile from "./../../components/auth/Profile";
import HeaderManager from "./../../components/layouts/HeaderManager";

import getDataMixin from "./../../plugins/mixins/auth/prfile/getData";

export default {
  layout: "auth",
  middleware: ["init-auth", "is-auth", "is-user"],
  mixins: [getDataMixin],
  components: {
    Table,
    Profile,
    HeaderManager
  },
  async asyncData({ app, store }) {
    // get all users data
    const data = await app.$axios.$get("/get-users?table=true", {
      headers: {
        Authorization: "Bearer " + store.getters["login/getUserData"]().token,
        defaults: "123,124,122,125,110,126,121,120"
      }
    });
    return {
      allUsers: data.users,
      user: data.userSchema,
      userSchemaWithoutChange: data.userSchema,
      creator: data.creator,
      defaults: data.defaults,
      userBmans: data.userBmans
    };
  },
  data() {
    return {
      generalHeaderStatus: "User",
      formStatus: "",
      showForm: false,
      EnableProfileInputs: true,
      submit: false,
      cancel: false,
      headerStatus: "",
      components: {
        table: { show: true, checkboxEnabled: true, unSelect: false },
        headerManager: { show: true, generalStatus: "User", status: "" },
        profile: { show: true, actionStatus: "", inputsReadonly: true }
      },
      tableSchema: {
        TU_FUserName: "نام کاربری",
        TU_FCode: "کد شخص",
        TU_FNameFamil: "نام و نام خانوادگی",
        TU_FCodeMeli: "کد ملی",
        TU_FDateBirth: "تاریخ تولد",
        TU_FLinkTypeName: "نوع",
        TU_FID_GroupName: "گروه",
        TU_FID_CaptionName: "عنوان",
        TU_FID_SexName: "جنسیت",
        TU_FID_City1Name: "استان",
        TU_FID_City2Name: "شهر",
        TU_FID_RelationName: "روش اشنایی",
        TU_FID_BussinesName: "شغل",
        TU_FUserBmanName: "بازاریاب/معرف",
        TU_FID_AccessName: "نوع کاربری",
        TU_FActiveName: "فعال بودن",
        TU_FIsUserName: "کاربر بودن",
        TU_FDateReg: "تاریخ ثبت",
        TU_FID: "سریال"
      },
      selectedUser: [],
      selectingMode: "start"
    };
  },
  computed: {
    refresh() {
      return this.$store.getters["tableRefresh/refresh"];
    }
  },

  mounted() {
    // تعیین حالت اولیه هدر و فرم
    this.headerManagerEventHandler("start");
  },
  methods: {
    selectedRowChanged(selectedItems) {
      if (selectedItems.length === 0) {
        this.components.headerManager.status = "not-selected";
        this.components.profile.show = false;
      } else if (selectedItems.length === 1) {
        this.components.headerManager.status = "selecting";
      } else if (selectedItems.length > 1) {
        this.components.profile.show = false;
        this.components.headerManager.status = "multi-selecting";
      }
      // مقدار دهی حالت هدر بعد از انصراف
      this.selectingMode = this.components.headerManager.status;
      this.selectedUser = selectedItems;
    },
    async insertInit() {
      try {
        this.user = { ...this.userSchemaWithoutChange };

        const data = await this.getData("table.init.noUsers");
        this.user = { ...data.userSchema };
        this.defaults = data.defaults;
        this.userBmans = data.userBmans;
        this.creator = data.creator;
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    async editInit() {
      this.user = { ...this.userSchemaWithoutChange };

      try {
        if (this.selectedUser.length == 1) {
          const data = await this.getData("edit.other", this.selectedUser[0]);
          this.user = data.user;
          this.defaults = data.defaults;
          this.userBmans = data.userBmans;
          this.creator = data.creator;
        }
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    async delete() {
      try {
        if (this.selectedUser.length > 0 && this.selectedUser.length < 11) {
          let isDeleted = false;
          for (const userId of this.selectedUser) {
            // جلوگیری از حذف خودش
            const loggedInUser = this.$store.getters["login/getUserData"]();
            if (loggedInUser.TU_FID != userId) {
              const result = await this.$authAxios.$delete("/delete/" + userId);
              this.selectedUser = [];
              this.unSelectAllTableRows();
              this.components.headerManager.status = "deleted";
              this.showResponseSuccessMessages(result);
              isDeleted = true;
            } else {
              this.components.headerManager.status = "failed";
              this.errorToast(" شما مجاز به این حذف نمیباشید ");
            }
          }
          if (isDeleted) await this.getNewUsers();
          /* 
          // حذف گروهی
          if (this.selectedUser.length > 0) {
            const result = await this.$authAxios.$delete("/user/delete", {
              ids: this.selectedUser
            });
            this.unSelectAllTableRows();
            this.selectedUser = [];
            this.components.headerManager.status = "deleted";
            this.showResponseSuccessMessages(result);
            // await this.getNewUsers();
          }
          */
        } else {
          this.components.profile.actionStatus = "failed";
          this.errorToast(" شما مجاز به حذف این تعداد نمیباشید ");
        }
      } catch (error) {
        this.showResponseErrors(error);
      }
    },
    // تابعی برایه مدیریت هدر اکشن ها
    headerManagerEventHandler(status) {
      this.components.table.checkboxEnabled = false;
      this.components.profile.actionStatus = status;
      if (status == "start") {
        this.components.headerManager.status = "start";
        this.components.profile.show = false;
        this.components.table.show = true;
        this.components.table.checkboxEnabled = true;
      } else if (status == "insert") {
        this.components.profile.inputsReadonly = false;
        this.components.profile.show = true;
        this.components.table.checkboxEnabled = false;
        this.components.headerManager.status = "insert";
        this.insertInit();
      } else if (status == "show") {
        this.components.profile.inputsReadonly = true;
        this.components.profile.show = true;
        this.components.table.checkboxEnabled = false;
        this.components.headerManager.status = "show";
        this.editInit();
      } else if (status == "edit") {
        this.components.profile.inputsReadonly = false;
        this.components.profile.show = true;
        this.components.table.checkboxEnabled = false;
        this.components.headerManager.status = "edit";
        this.editInit();
      } else if (status == "delete") {
        this.components.profile.show = false;
        this.components.table.checkboxEnabled = true;
        this.unSelectAllTableRows();
        this.components.headerManager.status = "delete";
        this.delete();
      } else if (status == "canceled") {
        this.components.profile.show = false;
        this.components.headerManager.status = this.selectingMode;
        this.headerManagerEventHandler(this.selectingMode);
        this.components.table.checkboxEnabled = true;
      } else if (status == "done") {
        this.components.profile.show = false;
        this.components.headerManager.status = this.selectingMode;
        this.headerManagerEventHandler(this.selectingMode);
        this.components.table.checkboxEnabled = true;
      }
    },
    submitEvent(submitted) {
      // this.user = { ...this.userSchemaWithoutChange };
      this.submit = submitted;
    },
    cancelEvent(canceled) {
      this.cancel = canceled;
      // this.user = { ...this.userSchemaWithoutChange };
      this.components.headerManager.status = "canceled";
      this.headerManagerEventHandler("canceled");
      // نغییر حالت دکمه ها و هدر بعد از انصراف
    },
    async getNewUsers() {
      this.$store.dispatch("tableRefresh/refreshStart");
      try {
        const data = await this.getData("table.init");
        this.userSchema = { ...data.userSchema };
        this.allUsers = data.users;
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
      this.$store.dispatch("tableRefresh/refreshStop");
    },
    done() {
      // update table
      this.components.headerManager.status = "done";
      this.components.profile.show = false;
      this.getNewUsers();
      this.headerManagerEventHandler("done");
      this.components.table.checkboxEnabled = true;
    },
    failed() {
      if (this.components.headerManager.status === "delete") {
        this.components.profile.show = true;
      }
      this.components.headerManager.status = "failed";
    },
    // helper functions
    unSelectAllTableRows() {
      this.components.table.unSelect = !this.components.table.unSelect;
    }
  },
  watch: {
    refresh(refresh) {
      if (refresh) {
        this.getNewUsers();
      }
    }
  }
};
</script>