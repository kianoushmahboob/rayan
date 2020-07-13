<template>
<v-container class="pt-1">
    <h2>پیشفرض ها</h2>
    <v-row class="defaultForm">
        <v-col cols="6" md="4">
            <Input lable="کد " type="int" icon="user" name="TU_FUserName" v-model="data.TD_FCode" required :readonly="readonly" />
        </v-col>

        <v-col cols="6" md="4">
            <Input lable="نام" name="TD_FName" v-model="data.TD_FName" required :readonly="readonly" />
        </v-col>

        <v-col cols="6" md="4">
            <Input lable="عنوان" name="TD_FCaption" v-model="data.TD_FCaption" :readonly="readonly" />
        </v-col>

        <v-col cols="6" md="3">
            <Input lable="ترتیب" name="TD_FOrder" v-model="data.TD_FOrder" :readonly="readonly" />
        </v-col>

        <v-col cols="6" md="3">
            <Input lable="مقدار1" name="TD_FValue1" required v-model="data.TD_FValue1" :readonly="readonly" />
        </v-col>

        <v-col cols="6" md="3">
            <Input lable="مقدار2" name="TD_FValue2" v-model="data.TD_FValue2" :readonly="readonly" />
        </v-col>

        <v-col cols="12" md="3" sm="12">
            <Input lable="مقدار3" name="TD_FValue3" v-model="data.TD_FValue3" :readonly="readonly" />
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="6" class="pt-0 mt-0">
            <Checkbox lable="زیرگروه" name="TD_FSubGroup" v-model="data.TD_FSubGroup" :readonly="readonly" />
        </v-col>

        <v-col cols="6" class="pt-0 mt-0">
            <Checkbox lable="فعال بودن" name="TD_FActive" v-model="data.TD_FActive" :readonly="readonly" />
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" class="pt-0">
            <Textarea v-model="data.TD_FComment" lable="توضیحات" maxLength="500" name="TD_FComment" :readonly="readonly" />
            </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/sass/components/Defaults/Defualts.scss"
export default {
    props: ["data", "readonly"],
    data() {
        return {};
    }
};
</script>
