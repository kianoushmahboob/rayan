<template>
	<v-container class="pt-1">
		<h2>دسته بندی ها</h2>
		<v-row class="defaultForm">
			<v-col cols="6" md="3">
				<Input
					lable="کد"
					type="int"
					icon="user"
					name="TC_FCode"
					v-model="data.TC_FCode"
					required
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="نام" name="TC_FName" v-model="data.TC_FName" required :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="عنوان" name="TC_FCaption" v-model="data.TC_FCaption" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Textarea lable="توضیحات" name="TC_FComment" v-model="data.TC_FComment" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="مقدار" name="TC_FValue1" v-model="data.TC_FValue1" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="متن html" name="TC_FHtml" required v-model="data.TC_FHtml" :readonly="readonly" />
			</v-col>

			<v-col cols="6" md="3">
				<label for="image1" class="profileFileLable">عکس 1</label>
				<input type="file" ref="profileImage" name="TC_FAddPic1" id="image1" class="profileFileInp" />
			</v-col>

			<v-col cols="12" md="3" sm="12">
				<label for="image2" class="profileFileLable">عکس 2</label>
				<input type="file" ref="profileImage" name="TC_FAddPic2" id="image2" class="profileFileInp" />
			</v-col>

			<v-col cols="12" md="3" sm="12">
				<label for="image3" class="profileFileLable">عکس 3</label>
				<input type="file" ref="profileImage" name="TC_FAddPic3" id="image3" class="profileFileInp" />
			</v-col>

			<v-col cols="6" md="3">
				<Input lable="ترتیب" name="TC_FOrder" required v-model="data.TC_FOrder" :readonly="readonly" />
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="3" class="pt-0 mt-0">
				<Checkbox lable="فعال" name="TC_FActive" v-model.number="data.TC_FActive" :readonly="readonly" />
			</v-col>

			<v-col cols="3" class="pt-0 mt-0">
				<Checkbox lable="زیرگروه" name="TC_FSubGroup" v-model="data.TC_FSubGroup" :readonly="readonly" />
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="6" md="3">
				<Datapicker
					lable="تاریخ ثبت"
					name="TC_FDateReg"
					required
					v-model="data.TC_FDateReg"
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" md="3">
				<Datapicker
					lable="ساعت ثبت"
					name="TC_FTimeReg"
					required
					v-model="data.TC_FTimeReg"
					:readonly="readonly"
				/>
			</v-col>

			<v-col cols="6" md="3">
				<Select
					lable="کاربر ثبت کننده"
					:defaults="data.users"
					idField="TD_FID"
					nameField="TU_FNameFamil"
					name="TC_FUserReg"
					required
					v-model="data.TC_FUserReg"
				/>
			</v-col>
		</v-row>
		<!-- <v-row>
			<v-col cols="6" md="3">
				<Button lable="ثبت" type="insert" />
		</v-col>-->
		<!-- </v-row> -->
		<!-- <v-row>
			<v-col cols="6" md="3">
				<Button lable="ثبت" type="insert" />
			</v-col>
		</v-row>-->
	</v-container>
</template>

<script>
	export default {
		props: ["data", "readonly"],
		data() {
			return {};
			return {
				a: ""
			};
		}
	};
</script>
