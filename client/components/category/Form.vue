<template>
	<v-container class="pt-1">
		<h2>دسته بندی ها</h2>
		<v-row class="defaultForm">
			<v-col cols="6" md="3">
				<Input
					lable="کد"
					type="int"
					icon="user"
					name=""
					v-model="a"
					required
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="نام" 
                name="" v-model="a" required :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="عنوان" name="TD_FCaption" v-model="a" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Textarea lable="توضیحات" name="" v-model="a" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Input
					lable="متن html"
					name=""
					required
					v-model="a"
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" md="3">
                <label
                  for="image1"
                  class="profileFileLable"
                >عکس 1</label>
                <input
                  type="file"
                  ref="profileImage"
                  name="photo"
                  id="image1"
                  class="profileFileInp"
                />
			</v-col>

			<v-col cols="12" md="3" sm="12">
                <label
                  for="image2"
                  class="profileFileLable"
                >عکس 2</label>
                <input
                  type="file"
                  ref="profileImage"
                  name="photo"
                  id="image2"
                  class="profileFileInp"
                />
			</v-col>

            
			<v-col cols="12" md="3" sm="12">
                <label
                  for="image3"
                  class="profileFileLable"
                >عکس 2</label>
                <input
                  type="file"
                  ref="profileImage"
                  name="photo"
                  id="image3"
                  class="profileFileInp"
                />
			</v-col>

            		<v-col cols="6" md="3">
				<Input
					lable="ترتیب"
					name=""
					required
					v-model="a"
					:readonly="readonly"
				/>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="6" class="pt-0 mt-0">
				<Checkbox
					lable="فعال"
					name=""
					v-model.number="a"
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" class="pt-0 mt-0">
				<Checkbox lable="زیرگروه" name="" v-model="a" :readonly="readonly" />
			</v-col>
		</v-row>

		<v-row>
			        		<v-col cols="6" md="3">
				<Datapicker
					lable="تاریخ ثبت"
					name=""
					required
					v-model="a"
					:readonly="readonly"
				/>
			</v-col>
            			        		<v-col cols="6" md="3">
				<Datapicker
					lable="تاریخ ثبت"
					name=""
					required
					v-model="a"
					:readonly="readonly"
				/>
			</v-col>

                <v-col cols="6" md="3">
				<Datapicker
					lable="کاربر ثبت کننده"
					name=""
					required
					v-model="a"
					:readonly="readonly"
				/>
			</v-col>
		</v-row>
        <v-row>
                        <v-col cols="6" md="3">
				<Button
					lable="ثبت"
                    type="insert"
				/>
			</v-col>
        </v-row>
	</v-container>
</template>

<script>
	export default {
		props: ["data", "readonly"],
		data() {
			return {
                a: ''
            };
		}
	};
</script>
