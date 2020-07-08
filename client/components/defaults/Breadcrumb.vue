<template>
  <v-container fluid="fluid">
    <v-row class="breadcrumb">
      <v-col cols="12" class="pt-1">
        <button class="back" @click="removeFromBreadcrumb">بازگشت</button>
        <ul class>
          <!-- visited: کلاس مسیرهای رفته شده  -->
          <!-- current: کلاس مسیر فعلی  -->
          <li
            :class="{ visited : index !==breadcrumb.length -1, current: index ===breadcrumb.length - 1}"
            v-for=" (breadcrumbItem, index) in breadcrumb"
            :key="index"
          >
            <p>{{decreaseBreadcrumbLemgth(breadcrumbItem)}}</p>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["breadcrumb", "nameField"],
  data() {
    return {
      showBreadcrumb: []
    };
  },
  methods: {
    // تابع دکمه بازگشت
    removeFromBreadcrumb() {
      this.$emit("removeFromBreadcrumb");
    },
    decreaseBreadcrumbLemgth(e) {
    //   کوتاه کردن عنوان مسیر تا 10 کاراکتر
      if (e[this.nameField].length > 15) {
        return e[this.nameField].substring(0, 15) + "...";
      }
      return e[this.nameField]
    }
  },
  watch: {
    
  }
};
</script>