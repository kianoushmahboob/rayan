<template>
  <div class="relative">
    <div class="form-group form__group field">
      <span class="errorMessages" v-if="errorMessages.length > 0 "> {{ errorMessages[0] }}</span>
      <v-select
        v-if="showWatch || showMount" 
       
        v-model="selectedItem"
        :as="nameField + ':' + idField + ':' + idField"
        :from="from"
        @change="change"
      ></v-select>
      <p class="SelectDisabled" v-show="readonly">{{ this.iteme ? this.iteme[nameField]: ' ' }}</p>
      <label :for="[name]" class="form__label__select">{{lable}}</label>
    </div>
  </div>
</template>

<script>
import "@desislavsd/vue-select/dist/vue-select.css";
import Select from "./../../plugins/mixins/UI-mixins/select";
import VueSelect from "@desislavsd/vue-select";
import "../../assets/sass/components/UI/select.scss";

export default {
  mixins: [Select],
  components: { vSelect: VueSelect.vSelect },
  props: 
    {
    readonly: Boolean,
    value: {
      default: -1
    }
  },
  data() {
    return {
      as: this.nameField + "::" + this.idField,
      from: [],
      iteme: {
        TD_FName: ''
      },
      selectedItem: "",
      showMount: false,
      showWatch: false,
      showWithoutValue: false,
      errorMessages: []
    };
  },
  computed: {},
  watch: {
    value(newValue) {
      this.changeValue(this.value, "watch");
    },
    rel(newValue, oldValue) {
      if (newValue) {
        this.from = this.mainData.filter(el => {
          return el[this.relField] === newValue;
        });
        if (oldValue) {
          this.selectedItem = "";
        }
      }
    }
  },
  methods: {
    changeValue(e, state) {
      if (e) {
        this.iteme = this.from.filter(el => el[this.idField] == e)[0];
        if (this.iteme) {
          this.selectedItem = this.value;
          this.showNeededSelect(state);
        }
      } else {
        this.showNeededSelect(state);
      }

      if (!this.defaultCode) {
        this.showNeededSelect(state);
      }
    },
    change(e) {
      //  بودن required  چک کردن 
      if(this.required) {
        this.errorMessages = []
        if ( e === undefined ) { 
          this.errorMessages.push('انتخاب یکی از گزینه زیر اجباریست')
        }
      }

      if (e) {
        this.$emit("input", e.value);
      }
      // درصورتی که مقداری در  سلکت انتخاب نشود مقدار آن صفر میشود 
      if (e === undefined){ 
        this.$emit('input' , 0) 
      }
    },
    showNeededSelect(state) {
      if (state == "watch") {
        this.showWatch = true;
      }
      if (state == "mounted") {
        this.showMount = true;
      }
    }
  },
  mounted() {
    this.changeValue(this.value, "mounted");
  }
};
</script>