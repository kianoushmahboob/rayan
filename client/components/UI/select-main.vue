<template>
  <div class="relative">
    <div class="form-group form__group field" v-if="value">
      <v-select v-model="selectedItem[idField]" :as="as" :from="from" @change="changeValue"></v-select>
      <label :for="[name]" class="form__label__select">{{lable}}</label>
      aaaa
    </div>
    <div class="form-group form__group field" v-if="value == 0">
      <v-select
        v-model="selectedItemWithoutValue"
        :as="as"
        :from="from"
        @change="changeWithoutValue"
      ></v-select>
      <label :for="[name]" class="form__label__select">{{lable}}</label>
      bbb
    </div>
  </div>
</template>

<script>
import "@desislavsd/vue-select/dist/vue-select.css";
import Select from "./../../plugins/mixins/UI-mixins/select";
import VueSelect from "@desislavsd/vue-select";
import "../../assets/sass/components/select.scss";

export default {
  mixins: [Select],
  components: { vSelect: VueSelect.vSelect },
  props: ["value"],
  data() {
    return {
      as: this.nameField + ":" + this.idField + ":" + this.idField,
      selectedItem: {},
      selectedItemWithoutValue: "",
      from: [],
      mainData: [],
      newValue: "",
      tagKeys: [],
      show: false
    };
  },
  watch: {
    value(newValue) {
      if (newValue != 0) {
        this.selectedItem = this.from.filter(el => {
          return el[this.idField] == newValue;
        })[0];
      } else {
        // for (const key in this.from[0]) {
        //   this.selectedItem[key] = null;
        // }
        // this.selectedItem[this.idField] = 0;
      }
    },
    rel(newValue) {
      if (newValue) {
        this.from = this.mainData.filter(el => {
          return el[this.relField] === newValue;
        });
      }
    }
  },
  methods: {
    changeValue(e) {
      if (e) {
        this.selectedItem = this.from.filter(el => {
          return el[this.idField] === e.index;
        })[0];
        this.$emit("input", e.index);
      } else {
        this.selectedItem[this.idField] = 0;
      }
    },
    setSelectedValue(newValue) {
      if (newValue != 0) {
        this.selectedItem = this.from.filter(el => {
          return el[this.idField] == newValue;
        })[0];
        if (this.selectedItem) {
          console.log(
            "this.selectedItem[this.idField]",
            this.selectedItem[this.idField]
          );
           console.log(
            "this.selectedItem[this.nameField]",
            this.selectedItem[this.nameField]
          );
          console.log("this.nameField", this.nameField);
        }
      }
    },
    changeWithoutValue(e) {
      if (e) {
        this.$emit("input", e.index);
      }
    }
  },
  mounted() {
    this.setSelectedValue(this.value);
  }
};
</script>