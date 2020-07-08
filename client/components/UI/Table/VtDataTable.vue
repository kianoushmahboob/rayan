<template>
  <v-container fluid :class="`VueTables VueTables--${props.source}`" slot-scope="props">
    <!-- پیجینیشن  -->
    <v-row>
      <v-col cols="12" class="text-center">
        <vt-pagination class="mx-auto width-auto" />
      </v-col>
    </v-row>

    <v-row class="relative">
      <v-row class="padding-x">
        <!-- تعداد نمایش اطلاعات -->
        <v-col
          cols="2"
          class="bgPrimary mb-0"
          v-if="props.perPageValues.length > 1"
          :class="`${props.theme.field} ${props.theme.inline} ${props.theme.right} VueTables__limit`"
        >
          <vnodes :vnodes="props.slots.beforeLimit" />
          <vt-per-page-selector />
          <vnodes :vnodes="props.slots.afterLimit" />
        </v-col>
        <!-- فیلد جستوجو کلی  -->
        <v-col :cols="[{'10': props.perPageValues.length > 1} , '12']" class="SearchInTable rtl">
          <v-row>
            <v-col cols="3" class="mt-0 dis-flex pb-0 pt-2">
              <input
                type="text"
                v-model.trim="searchValue"
                @keypress.enter="globalSearch = searchValue"
                placeholder="جستجو ..."
              />
              <button>
                <img src="/search.png" @click="globalSearch = searchValue" alt />
              </button>
            </v-col>

            <v-col
              cols="1"
              :class="[' TableRefreshImg pt-2 pl-0 pb-0' , {'TableRefreshImgAnimation': refresh}]"
            >
              <img src="/refresh.png" @click="refreshClick" />
            </v-col>
            <v-col cols="1" class="TableDeleteImg pt-2 pb-0 pr-0">
              <img src="/delete.png" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-col cols="12" class="p-0">
        <!-- فیلدهای نمایش جستوجو در هر ستون  -->
        <div
          v-if="!props.opts.filterByColumn && props.opts.filterable"
          :class="`${props.theme.field} ${props.theme.inline} ${props.theme.left} VueTables__search`"
        >
          <vnodes :vnodes="props.slots.beforeFilter" />
          <vt-generic-filter />
          <vnodes :vnodes="props.slots.afterFilter" />
        </div>
      </v-col>
    </v-row>

    <vnodes :vnodes="props.slots.beforeTable" />
    <div class="table-responsive">
      <!-- جدول -->
      <vt-table ref="vt_table" />
    </div>
    <vnodes :vnodes="props.slots.afterTable" />
  </v-container>
</template>

<script>
import VtColumnsDropdown from "vue-tables-2/compiled/components/VtColumnsDropdown";
import VtTableHeading from "vue-tables-2/compiled/components/VtTableHeading";
import VtFiltersRow from "vue-tables-2/compiled/components/VtFiltersRow";

import VtDropdownPagination from "vue-tables-2/compiled/components/VtDropdownPagination";
import VtGenericFilter from "vue-tables-2/compiled/components/VtGenericFilter";
import VtPerPageSelector from "vue-tables-2/compiled/components/VtPerPageSelector";
import VtPagination from "vue-tables-2/compiled/components/VtPagination";
import VtTable from "vue-tables-2/compiled/components/VtTable";

export default {
  data() {
    return {
      globalSearch: "",
      searchValue: ""
    };
  },
  name: "VtDataTable",
  props: ["props"],
  components: {
    VtGenericFilter,
    VtTableHeading,
    VtFiltersRow,
    VtPerPageSelector,
    VtColumnsDropdown,
    VtDropdownPagination,
    VtTable,
    VtPagination,
    vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  computed: {
    refresh() {
      return this.$store.getters["tableRefresh/refresh"];
    }
  },
  methods: {
    refreshClick() {
      this.$store.dispatch("tableRefresh/refreshStart");
    }
  },
  watch: {
    globalSearch(newValue) {
      this.$store.dispatch("table/setSearch", newValue);
    },
    searchValue(newValue) {
      // گرفتن اطلاعات اولیه در صورت خالی بودن فبلد جستجو
      if (newValue === "") {
        this.globalSearch = ''
      }
    }
  }
};
</script>