<template>
<div>
    <p :class="[{'pleaseWait' : refresh} , {'dis-none': !refresh}]">لطفا کمی صبر کنید ، در حال دریافت اطلاعات....</p>
    <div :class="['text-right Table' , {'TableBlur' : refresh}]">
        <client-only>
            <div id="app" v-cloak>
                <v-client-table :columns="columns" v-model="tableData" :options="options">
                    <button v-if="breadcrumb" :class="['subgroup' , { 'activeSubGroup' : currentParentGroupID == props.row[idField] }]" :slot="clickableColumn" slot-scope="props" @click="addToBreadcrumb(props.row)">{{props.row[clickableColumn]}}</button>
                    <!-- چک باکس هدر  -->
                    <div slot="filter__checkbox">
                        <input type="checkbox" class="form-control" @click="checkedAll" v-model="allSelected" id="allSelected" />
                    </div>
                    <!-- چک باکس داخل جدول  -->
                    <input type="checkbox" slot="checkbox" slot-scope="{row}" :disabled="!checkboxDisabled" :checked="checked(row[idField])" :value="row[idField]" @change="change" />

                    <!-- منو باز شو زیر هر سطر جدول  -->
                    <!-- <div slot="child_row" slot-scope="props">

</div>-->
                </v-client-table>
            </div>
        </client-only>
    </div>
</div>
</template>

<script>
import "../../assets/sass/components/auth/Table.scss";
// اندازه های اولیه هر ستون جدول
// import "./../../assets/sass/components/columnSize/profile.scss";
export default {
    props: [
        "data",
        "dataSchema",
        "clearRows",
        "checkboxDisabled",
        "breadcrumb",
        "clickableColumn",
        "idField",
        "currentParentGroupID",
        "currentPage"

    ],
    computed: {
        // تعریف ستون های جدول
      
        columns() {
            // custom columns name and table Schema data
            const columns = ["checkbox"];
            for (const key in this.dataSchema) {
                columns.push(key);
            }
            return columns.reverse();
        },
        // تنظیمات جدول
        options() {
            // custom columns name and table Schema data
            return {
                texts: {
                    filterBy: " "
                },
                // عنوان ستون های جدول
                headings: {
                    ...this.dataSchema,
                    checkbox: ""
                },
                //  بودن در هر ستون جستوجو انجام میشود  true  در صورت
                filterByColumn: {
                    ...this.dataSchema
                },
                // برای صورت کردن هر ستون استفاده میشود
                // درصورت پاک کردن این خط صورت کردن بر روی همه ستون ها اعمال میشود
                sortable: true
            };
        },
        globalSearch() {
            return this.$store.getters["table/search"];
        },
        refresh() {
            return this.$store.getters["tableRefresh/refresh"];
        },
        refreshButtonClicked() {
            return this.$store.getters["tableRefresh/refreshButtonClicked"];
        }
    },
    data: function () {
        return {
            TableRefreshImgAnimation: false,
            allSelected: false,
            selectedRow: [],
            searchResult: [],
            tableData: []
        };
    },
    methods: {
        RefreshTable() {
            this.TableRefreshImgAnimation = !this.TableRefreshImgAnimation;
        },
        checkedAll() {
            this.selectedRow = [];
            if (!this.allSelected) {
                for (const ALLSelect in this.data) {
                    this.selectedRow.push(this.data[ALLSelect][this.idField]);
                }
            }
            this.$emit("selectedRowChanged", this.selectedRow);
        },
        change(e) {
            // سطر های انتخاب گردیده توسط کاربری
            if (e.target.checked) {
                this.selectedRow.push(e.target.value);
            } else {
                this.selectedRow = this.selectedRow.filter(el => el !== e.target.value);
            }
            this.$emit("selectedRowChanged", this.selectedRow);
        },
        checked(value) {
            for (const row of this.selectedRow) {
                if (row == value) return true;
            }
            return false;
        },
        globalFilter(searchValue) {
            if (searchValue) {
                this.searchResult = this.data.filter(row => {
                    let founded = false;
                    for (const key in row) {
                        const attribute = row[key] ? row[key].toString() : "";
                        if (attribute.search(searchValue) != -1) {
                            founded = true;
                        }
                    }
                    if (founded) return true;
                });
            } else {
                this.searchResult = this.data;
            }
            return this.searchResult;
        },

        // تابع کامل کردن مسیر زیر گروه ها
        addToBreadcrumb(e) {
            this.$emit("addToBreadcrumb", e);
        }
    },
    watch: {
        data() {
            this.tableData = this.data;
        },
        currentPage(newValue) {
        },
        selectedRow() {
            const allSelectedId = document.getElementById("allSelected");
            if (this.selectedRow.length < this.data.length) {
                allSelectedId.checked = false;
                this.allSelected = false;
            } else {
                allSelectedId.checked = true;
            }
        },
        clearRows(newValue) {
            this.selectedRow = [];
            this.$emit("selectedRowChanged", this.selectedRow);
        },
        globalSearch(search) {
            this.tableData = this.globalFilter(search);
        },
        refreshButtonClicked(value) {
            this.$emit("refresh");
        }
    },
    async created() {
        this.tableData = this.data;
    }
};
</script>
