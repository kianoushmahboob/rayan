<template>
  <div class="datapicker form-group form__group field">

    <span class="errorMessages" v-if="errorMessages.length > 0 "> {{ errorMessages[0] }}</span>
    <date-picker
      :disabled="readonly"
      :type="dateType"
      placeholder="YYYY/MM/DD"
      :color="colors"
      @input="showInput"
      v-model="value"
      :editable="true"
    ></date-picker>
    <input v-model="value" @input="dataPickerValidate"   :disabled="readonly" @blur="dataPickerValidate" class="showInput" :maxlength="maxlength" />
    <label for="[name]" class="form__label">{{lable}}</label>
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import Datapicker from "./../../plugins/mixins/UI-mixins/datapicker";

import "./../../assets/sass/components/UI/datapicker.scss";
export default {
  props: {
    readonly: {
      default: false
    },
    dateType: {
      default: "date"
    },
    value: {
      type: String
    }
  },
  mixins: [Datapicker],
  data() {
    return {
      date: "",
      colors: "#E27973",
      datetime: null,
      newValue: ""
    };
  },
  computed: {
    maxlength() {
      let length;
      if (this.dateType == "date") length = 10;
      if (this.dateType == "time") length = 5;
      return length;
    }, 

  },
  components: {
    datePicker: VuePersianDatetimePicker
  },
  methods: {
       changeValue() {
        let newValue = "";
        let newValue2 = "";
        let validValue = "";
  
        if (this.dateType == "date") {
          // validation
          
          for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] == "/" || !isNaN(this.value[i])) {
              if (this.value[i] != " ") {
                this.validateDate(this.value);
                validValue += this.value[i];
              }
            }
          }
  
          for (let i = 0; i < validValue.length; i++) {
            if (validValue[i] != "/") {
              newValue += validValue[i];
            }
          }
  
          for (let i = 0; i < newValue.length; i++) {
            if (i === 4) {
              if (newValue[i + 1] !== "") {
                newValue2 += "/";
              }
            }
            if (i === 6) {
              if (newValue[i + 1] !== "") {
                newValue2 += "/";
              }
            }
            newValue2 += newValue[i];
          }
        } else if (this.dateType == "time") {
          // validation
          for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] == ":" || !isNaN(this.value[i])) {
              if (this.value[i] != " ") {
                this.validateTime(this.value);
                validValue += this.value[i];
              }
            }
          }
  
          for (let i = 0; i < validValue.length; i++) {
            if (validValue[i] != ":") {
              newValue += validValue[i];
            }
          }
  
          for (let i = 0; i < newValue.length; i++) {
            if (i === 2) {
              if (newValue[i + 1] !== "") {
                newValue2 += ":";
              }
            }
            newValue2 += newValue[i];
          }
        }
   
        this.value = newValue2;
        this.$emit("input", this.value);
         
      },
      showInput(e) {
        if (this.validateDate) { 
          this.errorMessages = []
        }
        this.$emit("input", e); 
      }
  },

  watch: {
  }
};
</script>
