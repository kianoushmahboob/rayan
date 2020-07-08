<template>
  <div
    class="form-group form__group field"
    :class="{ 'form-group--error': errorMessages.length > 0 }"
  >
    <div class="errorStyleTextarea" v-if="true">{{ errorMessages[0] }}</div>
    <div class="errorStyleTextarea" v-if="false">حداقل {{'aaaaaaaaa'}} کاراکتر.</div>
    <textarea
      rows="1"
      :disabled="readonly"
      class="form-control form__field"
      :id="[name]"
      @input="sendBackInputValue"
      @blur="clickInput"
      :value="value"
      :maxlength="maxLength"
    ></textarea>
    <label :for="[name]" class="form__label">{{lable}}</label>
  </div>
</template>
<script>
import TextareaMixin from "./../../plugins/mixins/UI-mixins/textarea";
import "../../assets/sass/components/UI/Textarea.scss";

export default {
  name: "Input",
  props: ["value", "readonly"],
  mixins: [TextareaMixin],
  data() {
    return {
      TextareaValue: ""
    };
  },
  methods: {
    sendBackInputValue(e) {
      // ولیدت کردن فیلد
      this.validate();
      if (!this.checkMaxLength()) {
        this.$emit("input", e.target.value);
      }
    },
    clickInput() {
      this.validate();
    }
  },
  destroyed() {
    this.$store.commit("disableEditMode");
  }
};
</script>