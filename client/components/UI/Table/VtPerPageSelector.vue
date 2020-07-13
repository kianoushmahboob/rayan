<template>
  <!-- تعداد نمایش اطلاعات در جدول  -->
  <div class="VueTables__limit-field">
    <v-select
      :id="props.selectAttrs.id"
      :value="props.selectAttrs.value"
      label="تعداد نمایش : "
      @change="props.selectEvents.change"
      :items="props.perPageValues"
    />
  </div>
</template>

<script>
export default {
  name: "VtPerPageSelector",
  props: ["props"]
};
</script>