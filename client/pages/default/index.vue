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

    <Form v-if="components.form.show" :data="defaultValue" />

    <Breadcrumb
      :breadcrumb="components.breadcrumb.values"
      nameField="TD_FName"
      @removeFromBreadcrumb="removeFromBreadcrumb"
    />

    <Table
      :v-if="components.table.show"
      :data="defaultTableData"
      :dataSchema="components.table.schema"
      :clearRows="components.table.unSelect"
      :checkboxDisabled="components.table.checkboxEnabled"
      :clickableColumn="components.table.clickableColumn"
      :breadcrumb="components.breadcrumb.values"
      @addToBreadcrumb="addToBreadcrumb"
      @selectedRowChanged="selectedRowChanged"
      @refresh="getNewDats"
    />
  </div>
</template>


<script>
// components.profile.actionStatus : insert || edit تعیین وضعیت عملیات برای پروفایل
// headerStatus: insert || edit | ... تعیین وضعیت  دکمه های هدر
// generalHeaderStatus: user || card | ... تعیین وضعیت  کلی هدر
// clearRows: true || false پاک کردن سطر های انتخاب شده جدول
// EnableProfileInputs: true || false فعال یا غیر فعال کردن فیلد های داخل پروفایل
import "../../assets/sass/components/Defaults/Defualts.scss";

import HeaderManager from "./../../components/layouts/HeaderManager";
import Breadcrumb from "./../../components/defaults/Breadcrumb";
import Form from "./../../components/defaults/Form";
import Table from "./../../components/user/Table";
// گرفتن اطلاعات برای در حالت شروع و درج و نمایش  و ویرایش
// .getData(mode) mode= default.init , default.insert , ...
import DefaultGetDataMixin from "./../../plugins/mixins/default/getData";
import DefaultSubmitDataMixin from "./../../plugins/mixins/default/submitData";

export default {
  layout: "auth",
  middleware: ["init-auth", "is-auth", "is-user"],
  mixins: [DefaultGetDataMixin, DefaultSubmitDataMixin],
  components: {
    HeaderManager,
    Breadcrumb,
    Form,
    Table
  },
  async asyncData({ app, store }) {
    // گرفتن اطلاعات مورد نیاز برای شروع برنامه
    // get all defaults data
    const data = await app.$axios.$get("/default?mode=default.init", {
      headers: {
        Authorization: "Bearer " + store.getters["login/getUserData"]().token
      }
    });
    return {
      //
      defaultSchema: data.defaultSchema,
      defaultValue: data.defaultSchema,
      defaultTableData: data.defaultTableData
    };
  },
  data() {
    return {
      // submit: false,
      // cancel: false,
      components: {
        table: {
          show: true,
          checkboxEnabled: true,
          unSelect: false,
          clickableColumn: "TD_FName",
          schema: {
            TU_FROWNUM: "ردیف",
            TD_FCode: "کد",
            TD_FName: "نام",
            TD_FCaption: "عنوان",
            TD_FValue1: "مقدار 1",
            TD_FValue2: "مقدار 2",
            TD_FValue3: "مقدار 3",
            TD_FOrder: "ترتیب",
            TD_FSubGroupName: "زیرگروه دارد",
            TD_FDateReg: "تاریخ ثبت",
            TD_FUserRegName: "کاربر ثبت کننده"
          }
        },
        headerManager: { show: true, generalStatus: "Default", status: "" },
        form: { show: false, actionStatus: "", inputsReadonly: true },
        breadcrumb: { show: true, values: [{ TD_FName: "خانه" }] }
      },
      selectingMode: "start"
    };
  },
  computed: {
    currentDefaultID() {
      const breadcrumbs = this.components.breadcrumb.values;
      if (breadcrumbs.length > 1) {
        return breadcrumbs[breadcrumbs.length - 1].TD_FID;
      }
      return 0;
    }
  },
  mounted() {
    // تعیین حالت اولیه هدر و فرم
    this.headerManagerEventHandler("start");
  },
  methods: {
    // تابعی برایه مدیریت هدر اکشن ها
    async headerManagerEventHandler(status) {
      //   this.components.table.checkboxEnabled = false;
      this.components.form.actionStatus = status;
      if (status == "start") {
        this.components.headerManager.status = status;
        this.components.form.show = false;
        // this.components.table.show = true;
        // this.components.table.checkboxEnabled = true;
      } else if (status == "insert") {
        this.components.headerManager.status = status;
        await this.insertInit();
        // this.components.table.show = true;
        // this.components.table.checkboxEnabled = true;
        this.components.form.show = true;
      } else if (status == "canceled") {
        // this.components.form.show = true;
        this.headerManagerEventHandler("start");
        // this.components.table.show = true;
        // this.components.table.checkboxEnabled = true;
      }
    },
    cancelEvent() {
      // اعمال مربوط به کنسل کردن عملیات
      this.components.headerManager.status = "canceled";
      this.headerManagerEventHandler("canceled");
    },
    submitEvent() {
      const status = this.components.headerManager.status;
      // اعمال مربوط به تایید کردن عملیات
      this.submit(status, this.defaultValue);
    },
    // متد های کمکی برای مقدار دهی اولیه
    async insertInit() {
      try {
        const data = await this.getData("default.insert");
        this.defaultValue = { ...data.defaultSchema };
        this.defaultSchema = { ...data.defaultSchema };
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    // breadcrumb manage
    addToBreadcrumb(e) {
      if (!this.components.breadcrumb.values.includes(e)) {
        //   if (this.components.breadcrumb.values)
        let _default;
        this.defaultTableData.forEach(element => {
          if (element.TD_FID == e.TD_FID) {
            _default = { ...element };
          }
        });
        if (_default) {
          if (_default.TD_FSubGroup) {
            this.components.breadcrumb.values.push(e);
            this.updateTable();
          } else {
            console.log("مجاز نیستید");
          }
        }
      }
    },
    removeFromBreadcrumb() {
      if (this.components.breadcrumb.values.length > 1) {
        this.components.breadcrumb.values.pop();
        this.updateTable();
      }
    },
    // update table
    async updateTable() {
      try {
        this.$store.dispatch("tableRefresh/refreshStart");
        const data = await this.getData(
          "default.children",
          this.currentDefaultID
        );
        this.defaultTableData = data.defaultTableData;
        this.$store.dispatch("tableRefresh/refreshStop");

        // console.log("children", data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>