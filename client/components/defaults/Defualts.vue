<template>
  <div>
    <!-- <v-row class="HeaderDefualt">
      <v-container class="p-0" >
        <v-row>
          <v-col cols="6" class="rightNav p-0">
            <Button class="lg" type="confirm" lable="تایید" />
            <Button class="lg" type="cancel" lable="انصراف" />
          </v-col>
          <v-col cols="6" class="leftNav p-0">
            <Button class="md" type="insert" lable="درج" />
            <Button class="md" type="edit" lable="ویرایش" />
            <Button class="md" type="delete" lable="حذف" />
          </v-col>
        </v-row>
      </v-container>
    </v-row> -->
    <!-- <v-container class="pt-1">
      <h2>پیشفرض ها</h2>
      <v-row>
        <v-col cols="6" md="4">
          <Input name="TD_FCode" v-model="TD_FCode" lable="کد " min-length="2" max-length="3" />
        </v-col>

        <v-col cols="6" md="4">
          <Input lable="نام" name="TD_FName" v-model="TD_FName" />
        </v-col>

        <v-col cols="6" md="4">
          <Input lable="عنوان" name="TD_FCaption" v-model="TD_FCaption" />
        </v-col>

        <v-col cols="6" md="3">
          <Input lable="ترتیب" name="TD_FOrder" v-model="TD_FOrder" />
        </v-col>

        <v-col cols="6" md="3">
          <Input lable="مقدار1" name="TD_FValue1" v-model="TD_FValue1" />
        </v-col>

        <v-col cols="6" md="3">
          <Input lable="مقدار2" name="TD_FValue2" v-model="TD_FValue2" />
        </v-col>

        <v-col cols="12" md="3" sm="12">
          <Input lable="مقدار3" name="TD_FValue3" v-model="TD_FValue3" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="pt-0 mt-0">
          <Checkbox lable="زیرگروه" name="TD_FSubGroup" v-model="TD_FSubGroup" />
        </v-col>

        <v-col cols="6" class="pt-0 mt-0">
          <Checkbox lable="فعال بودن" name="TD_FActive" v-model="TD_FActive" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pt-0">
          <Textarea v-model="TD_FComment" lable="توضیحات" min-length="3" name="TD_FComment" />
        </v-col>
      </v-row>
    </v-container> -->

    <v-container fluid="fluid">
     
      <v-row>
        <v-col cols="12">
          <div class="text-right Table">
            <client-only>
              <div id="app" v-cloak>
                <v-client-table :columns="columns" v-model="data" :options="options">
                  <button
                    slot="name"
                    slot-scope="props"
                    @click="Subgroup(props.row.name)"
                  >{{props.row.name}}</button>
                  <!-- چک باکس هدر  -->
                  <div slot="filter__checkbox">
                    <input type="checkbox" class="form-control" />
                  </div>
                  <!-- چک باکس داخل جدول  -->
                  <v-checkbox
                    color="red darken-3"
                    type="checkbox"
                    slot="checkbox"
                    slot-scope="{row}"
                    v-model="row.name"
                  />
                  <!-- منو باز شو زیر هر سطر جدول  -->
                  <!-- <div slot="child_row" slot-scope="props"></div> -->
                </v-client-table>
              </div>
            </client-only>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import "../../assets/sass/components/auth/Table.scss";
// اندازه های اولیه هر ستون جدول
// import "./../../assets/sass/components/columnSize/profile.scss";
import "../../assets/sass/components/Defaults/Defualts.scss";
import Button from "../UI/button";
import Input from "../UI/Input";
import Checkbox from "../UI/Checkbox";
import Textarea from "../UI/Textarea";
import Table from "./../user/Table";

export default {
  props: ["editMode"],
  components: {
    Input,
    Checkbox,
    Textarea,
    Table,
    Button
  },
  data() {
    return {
      TD_FCode: "",
      TD_FName: "",
      TD_FCaption: "",
      TD_FOrder: "",
      TD_FValue1: "",
      TD_FValue2: "",
      TD_FValue3: "",
      TD_FSubGroup: "",
      TD_FActive: "",
      TD_FComment: "",

      // آرایه ذخیره کردن مسیرهای طی شده
      breadcrumb: ["خانه"],
      data: [],

      // تعریف ستون های جدول
      columns: ["body", "email", "id", "name", "postId", "checkbox"],
      // تنظیمات جدول
      options: {
        //  بودن در هر ستون جستوجو انجام میشود  true  در صورت
        filterByColumn: true,
        // عنوان ستون های جدول
        headings: {
          body: "متن",
          email: "ایمیل",
          id: "ای دی ",
          name: "نام",
          postId: "پست ای دی ",
          checkbox: "چک باکس"
        },
        // برای صورت کردن هر ستون استفاده میشود
        // درصورت پاک کردن این خط صورت کردن بر روی همه ستون ها اعمال میشود
        sortable: ["body", "id", "name"],
        // فیلترهای شخصی را در این قسمت می نویسیم
        customFilters: [
          {
            name: "column",
            callback: function(row, query) {
              return row.name[0] === query;
            }
          }
        ]
      }
    };
  },
  methods: {
    // تابع دکمه بازگشت
    breadcrumbBack() {
      if (this.breadcrumb.length > 1) {
        this.breadcrumb.pop();
      }
    },
    // تابع کامل کردن مسیر زیر گروه ها
    Subgroup(name) {
      if (!this.breadcrumb.includes(name)) {
        // کوتاه کردن عنوان مسیر تا 10 کاراکتر
        if (name.length > 10) {
          const newItem = name.substring(0, 10) + "...";
          this.breadcrumb.push(newItem);
        }
      }
    }
  },

  async created() {
    this.data = await this.$axios.$get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    // console.log(this.data[0]);
  }
};
</script>