<template>
  <div class="form-group form__group field checkbox">
    <span class="errorMessages" v-if="errorMessages.length > 0 ">{{ errorMessages[0] }}</span>
    <input
      class="checkboxInp"
      type="checkbox"
      :disabled="readonly"
      :name="[name]"
      :value="value"
      @change="checkCheckbox"
    />
    <label :for="[name]" class="form__label">{{lable}}</label>
  </div>
</template>

<script>
import checkboxInput from "./../../plugins/mixins/UI-mixins/checkbox";
import "../../assets/sass/components/UI/Checkbox.scss";

export default {
  props: ["value", "readonly"],
  mixins: [checkboxInput],
  data() {
    return {
      errorMessages: []
    };
  },
  methods: {
    checkCheckbox(newValue) {
      if (this.required) {
        this.errorMessages = [];
        if (newValue.target.checked === false) {
          this.errorMessages.push("مقدار زیر نباید خالی باشد");
        }
      }
      if (newValue.target.checked === false) {
        newValue.target.value = 0;
        this.$emit("input", newValue.target.value);
      } else {
        newValue.target.value = 1;
        this.$emit("input", newValue.target.value);
      }
    }
  },
  mounted() {
    if (this.value == "0") {
      this.$el.children[0].checked = false;
    } else {
      this.$el.children[0].checked = true;
    }
  }
};
</script>