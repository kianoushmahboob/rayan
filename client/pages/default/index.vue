<template>
	<div>
		<HeaderManager
			@submit="submitEvent"
			@cancel="cancelEvent"
			@insert="headerManagerEventHandler('insert')"
			@show="headerManagerEventHandler('show')"
			@edit="headerManagerEventHandler('edit')"
			@delete="headerManagerEventHandler('delete')"
			:buttonVisibility="components.headerManager.status"
			:generalHeaderStatus="components.headerManager.generalStatus"
		/>

		<Form
			v-if="components.form.show"
			:data="defaultValue"
			:readonly="components.form.inputsReadonly"
		/>

		<Breadcrumb
			:breadcrumb="components.breadcrumb.values"
			nameField="TD_FName"
			@removeFromBreadcrumb="removeFromBreadcrumb"
		/>

		<Table
			:v-if="components.table.show"
			:data="defaultTableData"
			:dataSchema="components.table.schema"
			:clearRows="components.table.unSelect"
			:checkboxDisabled="components.table.checkboxEnabled"
			:clickableColumn="components.table.clickableColumn"
			:breadcrumb="components.breadcrumb.values"
			idField="TD_FID"
			:currentParentGroupID="currentParentGroupID"
			@addToBreadcrumb="addToBreadcrumb"
			@selectedRowChanged="selectedRowChanged"
			@refresh="updateTable"
		/>
	</div>
</template>

<script>
	// components.profile.actionStatus : insert || edit تعیین وضعیت عملیات برای پروفایل
	// headerStatus: insert || edit | ... تعیین وضعیت  دکمه های هدر
	// generalHeaderStatus: user || card | ... تعیین وضعیت  کلی هدر
	// clearRows: true || false پاک کردن سطر های انتخاب شده جدول
	// EnableProfileInputs: true || false فعال یا غیر فعال کردن فیلد های داخل پروفایل
	import "../../assets/sass/components/Defaults/Defualts.scss";

	import HeaderManager from "./../../components/layouts/HeaderManager";
	import Breadcrumb from "./../../components/defaults/Breadcrumb";
	import Form from "./../../components/defaults/Form";
	import Table from "./../../components/user/Table";
	// گرفتن اطلاعات برای در حالت شروع و درج و نمایش  و ویرایش
	// .getData(mode) mode= default.init , default.insert , ...
	import DefaultGetDataMixin from "./../../plugins/mixins/default/getData";
	import DefaultSubmitDataMixin from "./../../plugins/mixins/default/submitData";

	export default {
		layout: "auth",
		middleware: ["init-auth", "is-auth", "is-user"],
		mixins: [DefaultGetDataMixin, DefaultSubmitDataMixin],
		components: {
			HeaderManager,
			Breadcrumb,
			Form,
			Table
		},
		async asyncData({ app, store }) {
			// گرفتن اطلاعات مورد نیاز برای شروع برنامه
			// get all defaults data
			const data = await app.$axios.$get("/default/0/init?mode=default.init", {
				headers: {
					Authorization: "Bearer " + store.getters["login/getUserData"]().token
				}
			});
			return {
				//
				defaultSchema: data.defaultSchema,
				defaultValue: data.defaultSchema,
				defaultTableData: data.defaultTableData
			};
		},
		data() {
			return {
				// submit: false,
				// cancel: false,
				components: {
					table: {
						show: true,
						checkboxEnabled: true,
						unSelect: false,
						clickableColumn: "TD_FName",
						selectedItems: [],
						schema: {
							TD_FROWNUM: "ردیف",
							TD_FCode: "کد",
							TD_FName: "نام",
							TD_FCaption: "عنوان",
							TD_FValue1: "مقدار 1",
							TD_FValue2: "مقدار 2",
							TD_FValue3: "مقدار 3",
							TD_FOrder: "ترتیب",
							TD_FSubGroupName: "زیرگروه دارد",
							TD_FDateReg: "تاریخ ثبت",
							TD_FUserRegName: "کاربر ثبت کننده"
						}
					},
					headerManager: {
						show: true,
						generalStatus: "Default",
						status: ""
					},
					form: {
						show: false,
						actionStatus: "",
						inputsReadonly: true
					},
					breadcrumb: {
						show: true,
						values: [
							{
								TD_FName: "خانه"
							}
						]
					}
				},
				currentParentGroupID: 0,

				selectingMode: "start"
			};
		},
		// آخرین زیرگروه فعال parent
		computed: {
			currentDefaultID() {
				const breadcrumbs = this.components.breadcrumb.values;
				if (breadcrumbs.length > 1) {
					return breadcrumbs[breadcrumbs.length - 1].TD_FID;
				}
				return 0;
			}
		},
		mounted() {
			// تعیین حالت اولیه هدر و فرم
			this.headerManagerEventHandler("start");
		},
		methods: {
			// تابعی برایه مدیریت هدر اکشن ها
			async headerManagerEventHandler(status) {
				try {
					const oldStatus = this.components.form.actionStatus;
					this.components.table.checkboxEnabled = true;
					this.components.form.actionStatus = status;
					if (status == "start") {
						this.components.headerManager.status = status;
						this.components.form.show = false;
					} else if (status == "insert") {
						this.components.headerManager.status = status;
						this.components.form.inputsReadonly = false;
						// جلوگیری از به روزرسانی اطلاعات در صورت مواجه شدن با خطا در عملیات قبلی
						if (oldStatus != "failed") {
							await this.insertInit();
						}

						this.components.table.checkboxEnabled = false;
						this.components.form.show = true;
					} else if (status == "show") {
						this.components.headerManager.status = status;
						this.components.form.inputsReadonly = true;
						// show data get .......
						// جلوگیری از به روزرسانی اطلاعات در صورت مواجه شدن با خطا در عملیات قبلی
						if (oldStatus != "failed") {
							await this.editAndShowInit();
						}
						this.components.form.inputsReadonly = true;
						this.components.table.show = true;
						this.components.form.show = true;
					} else if (status == "edit") {
						this.components.headerManager.status = status;
						this.components.form.inputsReadonly = false;
						// show data get .......
						// جلوگیری از به روزرسانی اطلاعات در صورت مواجه شدن با خطا در عملیات قبلی
						if (oldStatus != "failed") {
							await this.editAndShowInit();
						}
						this.components.table.show = true;
						this.components.form.show = true;
					} else if (status == "canceled") {
						this.components.form.show = false;
						this.components.headerManager.status = this.selectingMode;
						this.headerManagerEventHandler(this.selectingMode);
					} else if (status == "delete") {
						this.components.headerManager.status = status;
						for (const id of this.components.table.selectedItems) {
							await this.submitMixin("delete", id);
							this.clearSelectedItems();
						}
					} else if (status == "done") {
						this.components.form.show = false;
						this.components.headerManager.status = this.selectingMode;
						this.headerManagerEventHandler(this.selectingMode);
					} else if (status == "failed") {
						this.components.headerManager.status = oldStatus;
						this.components.form.show = true;
						this.headerManagerEventHandler(oldStatus);
					}
				} catch (error) {
					this.components.headerManager.status = "failed";
					this.headerManagerEventHandler(oldStatus);
				}
			},
			cancelEvent() {
				// اعمال مربوط به کنسل کردن عملیات
				this.components.headerManager.status = "canceled";
				this.headerManagerEventHandler("canceled");
			},
			async submitEvent() {
				try {
					const status = this.components.headerManager.status;
					// اعمال مربوط به تایید کردن عملیات
					const done = await this.submitMixin(
						status,
						this.defaultValue,
						this.currentDefaultID
					);
					if (done) {
						this.components.headerManager.status = "done";
						this.headerManagerEventHandler("done");
					} else {
						this.components.headerManager.status = "failed";
						this.headerManagerEventHandler("failed");
					}
				} catch (error) {
					console.log(error);
				}
			},
			// checkbox changes
			selectedRowChanged(selectedItems) {
				this.components.table.selectedItems = selectedItems;
				if (selectedItems.length === 0) {
					this.components.headerManager.status = "not-selected";
					this.components.form.show = false;
				} else if (selectedItems.length === 1) {
					this.components.headerManager.status = "selecting";
				} else if (selectedItems.length > 1) {
					this.components.form.show = false;
					this.components.headerManager.status = "multi-selecting";
				}
				// مقدار دهی حالت هدر بعد از انصراف
				this.selectingMode = this.components.headerManager.status;
			},
			// متد های کمکی برای مقدار دهی اولیه
			async insertInit() {
				try {
					const data = await this.getDataMixin(
						"default.insert",
						null,
						this.currentDefaultID
					);

					this.defaultValue = {
						...data.defaultSchema
					};
				} catch (error) {
					console.log(error);
					this.showResponseErrors(error);
				}
			},
			async editAndShowInit() {
				try {
					if (this.components.table.selectedItems.length == 1) {
						const id = this.components.table.selectedItems[0];
						const data = await this.getDataMixin("default.show", id);
						this.defaultValue = data.defaultFormData;
					}
				} catch (error) {
					console.log(error);
					this.showResponseErrors(error);
				}
			},
			// breadcrumb manage
			addToBreadcrumb(e) {
				if (!this.components.breadcrumb.values.includes(e)) {
					let _default;
					this.defaultTableData.forEach(element => {
						if (element.TD_FID == e.TD_FID) {
							_default = {
								...element
							};
						}
					});
					if (_default) {
						if (_default.TD_FSubGroup) {
							this.components.breadcrumb.values.push(e);
							this.components.headerManager.status = "start";
							this.headerManagerEventHandler("start");
							// moshkel drm
							this.components.table.unSelect = true;
							this.updateTable(e.TD_FID);
							this.clearSelectedItems();
							this.$store.dispatch("table/changePaginateGoInside");

							this.components.form.show = false;
						} else {
							this.infoToast("شما مجاز به انجام این کار نیستید");
						}
					}
				}
			},
			removeFromBreadcrumb() {
				if (this.components.breadcrumb.values.length > 1) {
					this.currentParentGroupID = this.components.breadcrumb.values.pop().TD_FID;

					this.clearSelectedItems();
					this.updateTable();
					this.components.form.show = false;
					this.$store.dispatch("table/changePaginateGoOutside");
				}
			},
			// clear selected items
			clearSelectedItems() {
				this.components.table.unSelect = !this.components.table.unSelect;
			},
			// update table
			async updateTable() {
				try {
					this.$store.dispatch("tableRefresh/refreshStart");
					const data = await this.getDataMixin(
						"default.children",
						this.currentDefaultID
					);
					this.defaultTableData = data.defaultTableData;
					this.$store.dispatch("tableRefresh/refreshStop");
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
</script>
