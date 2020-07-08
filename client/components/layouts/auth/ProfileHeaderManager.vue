<template>
  <div>
    <v-container fluid="fluid" class="mt-14 pt-0">
      <v-row>
        <v-col cols="12" class="HeaderManagerProfile p-0">
          <v-row>
            <v-col cols="6" class="mt-0 py-0">
              <Button
                lable="تایید"
                type="confirm"
                :disabled="submitAndCancelButtonDisable"
                @click="submitButtonClicked"
              />
              <Button
                lable="انصراف"
                type="cancel"
                :disabled="submitAndCancelButtonDisable"
                @click="cancelButtonClicked"
              />
            </v-col>
            <v-col cols="6" class="text-left mt-0 py-0">
              <Button
                lable="درج"
                type="insert"
                :disabled="insertBottonDisabled"
                v-if="!editMySelf"
                @click="insertButtonClicked"
              />
              <Button
                lable="ویرایش"
                type="edit"
                :disabled="editBottonDisabled"
                @click="editButtonClicked"
              />
              <Button
                lable="نمایش"
                type="show"
                :disabled="showBottonDisabled"
                @click="showButtonClicked"
                v-if="!editMySelf"
              />
              <Button
                lable="حذف"
                :disabled="deleteBottonDisabled"
                type="delete"
                @click="deleteButtonClicked"
                v-if="!editMySelf"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import "./../../../assets/sass/components/HeaderManager.scss";

export default {
  data() {
    return {
      submitAndCancelButtonDisable: true,
      insertBottonDisabled: true,
      showBottonDisabled: true,
      deleteBottonDisabled: true,
      editBottonDisabled: true,
      submit: false,
      cancel: false
    };
  },
  props: ["editMySelf", "buttonVisibility", "submitAndCancelDisable"],
  methods: {
    editButtonClicked() {
      this.$emit("edit");
      this.submitAndCancelButtonDisable = false;
    },
    showButtonClicked() {
      this.$emit("show");
      this.submitAndCancelButtonDisable = true;
    },
    async deleteButtonClicked() {
      this.$emit("delete");
      this.submitAndCancelButtonDisable = false;
    },
    insertButtonClicked() {
      this.$emit("insert");
      this.submitAndCancelButtonDisable = false;
    },
    submitButtonClicked() {
      this.submit = true;
      this.$emit("submit", this.submit);
      if (this.editMySelf) {
        this.submitAndCancelButtonDisable = true;
      }
      setTimeout(() => {
        this.resetSubmitAndCancelButton();
      }, 100);
    },
    cancelButtonClicked() {
      this.cancel = true;
      this.$emit("cancel", this.cancel);
      // if (this.editMySelf) {
        // this.submitAndCancelButtonDisable = true;
      // }
    },
    resetSubmitAndCancelButton() {
      this.submit = false;
      this.$emit("submit", this.submit);
      this.cancel = false;
      this.$emit("cancel", this.cancel);
    }
  },
  watch: {
    buttonVisibility(status, oldValue) {
      if (status == "start") {
        this.insertBottonDisabled = false;
        this.showBottonDisabled = true;
        this.deleteBottonDisabled = true;
        this.editBottonDisabled = true;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "insert") {
        this.insertBottonDisabled = false;
        this.showBottonDisabled = true;
        this.editBottonDisabled = true;
        this.deleteBottonDisabled = true;
        this.submitAndCancelButtonDisable = false;
      }
       else if (status == "selecting.insert") {
        this.insertBottonDisabled = true;
        this.showBottonDisabled = false;
        this.editBottonDisabled = false;
        this.deleteBottonDisabled = false;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "selecting") {
        this.insertBottonDisabled = true;
        this.showBottonDisabled = false;
        this.editBottonDisabled = false;
        this.deleteBottonDisabled = false;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "show") {
        this.insertBottonDisabled = true;
        this.showBottonDisabled = false;
        this.editBottonDisabled = false;
        this.deleteBottonDisabled = false;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "multiSelecting") {
        this.insertBottonDisabled = true;
        this.showBottonDisabled = true;
        this.editBottonDisabled = true;
        this.deleteBottonDisabled = false;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "noSelecting") {
        this.insertBottonDisabled = false;
        this.showBottonDisabled = true;
        this.editBottonDisabled = true;
        this.deleteBottonDisabled = true;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "deleted") {
        this.insertBottonDisabled = false;
        this.showBottonDisabled = true;
        this.editBottonDisabled = true;
        this.deleteBottonDisabled = true;
        this.submitAndCancelButtonDisable = true;
      } else if (status == "updated") {
        this.submitAndCancelButtonDisable = true;
      }
    },
    submitAndCancelDisable(newValue) {
      if (newValue) {
        this.submitAndCancelButtonDisable = true;
      }
    }
  }
};
</script>
