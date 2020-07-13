<template>
  <div
    class="form-group form__group field"
    :class="{ 'form-group--error': errorMessages.length > 0 }"
  >
    <div class="errorStyle" v-if="true">{{ errorMessages[0] }}</div>
    <div class="errorStyle" v-if="false">حداقل {{'aaaaaaaaa'}} کاراکتر.</div>
    <input
      :disabled="readonly"
      class="form-control form__field"
      :id="[name]"
      @input="sendBackInputValue"
      @blur="clickInput"
      :value="value"
      :maxlength="maxLength"
    />
    <img :src="`/${icon}.png`" v-show="showIcon" class="inputIcon" />
    <label :for="[name]" class="form__label">{{lable}}</label>
  </div>
</template>
<script>
import inputMixin from "./../../plugins/mixins/UI-mixins/input";
import "../../assets/sass/components/UI/Input.scss";

export default {
  name: "Input",
  props: ["value", "readonly"],
  data() {
    return {
      showIcon: true,
      inputValue: ""
    };
  },
  mixins: [inputMixin],
  methods: {
    
    sendBackInputValue(e) {
      // console.log('e', e)
      // console.log('target.value', e.target.value)
     
      this.validate(e.target.value);
      if (!this.checkMaxLength()) {
        this.$emit("input", e.target.value);
      }
      

    },
    clickInput() {
      this.validate();
    }
  }
};
</script>
