<template>
  <!-- به عنوان کلاس دکمه در نظر گرفته میشود withOutLable باشد showLable= false اگر  -->
      <v-btn :class="[type, {'withOutLable': !showLable} ]" class="button" @click="click" >
        <span v-show="this.showLable">{{ lable }}</span>
        <img :src="`/${type}.png`" v-show="this.showIcon" />
        <span class="tooltip" v-show="description">{{description}}</span>
      </v-btn>

</template>
<script>
import "../../assets/sass/components/UI/button.scss";
import mixinButton from "../../plugins/mixins/UI-mixins/button";
export default {
  mixins: [mixinButton],
  data() {
    return {
      showIcon: true,
      showLable: true
    };
  },
  created() {
    // ایکون نمایش داده نمیشود type درصورت وجود نداشتن
    if (!this.type) {
      this.showIcon = false;
    }
    // عنوان نمایش داده نمیشود lable درصورت وجود نداشتن
    if (!this.lable) {
      this.showLable = false;
    }
  },
   methods: {
     click() {
       this.$emit('click')
     }
   }
};
</script>