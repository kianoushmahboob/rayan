<template>
	<div>
		<v-container fluid="fluid" class="pt-0">
			<v-row>
				<v-col cols="12" class="HeaderManagerProfile p-0" id="HeaderMangerProfileId">
					<v-row>
						<v-col cols="6" class="mt-0 py-0">
							<Button
								class="mt-1"
								lable="تایید"
								type="confirm"
								:disabled="!buttons.submit.enable"
								@click="submitButtonClicked"
							/>
							<Button
								class="mt-1"
								lable="انصراف"
								type="cancel"
								:disabled="!buttons.cancel.enable"
								@click="cancelButtonClicked"
							/>
						</v-col>
						<v-col cols="6" class="text-left mt-0 py-0">
							<Button
								class="mt-1"
								v-if="buttons.insert.show"
								lable="درج"
								type="insert"
								:disabled="!buttons.insert.enable"
								@click="insertButtonClicked"
							/>
							<Button
								class="mt-1"
								v-if="buttons.edit.show"
								lable="ویرایش"
								type="edit"
								:disabled="!buttons.edit.enable"
								@click="editButtonClicked"
							/>
							<Button
								class="mt-1"
								lable="نمایش"
								v-if="buttons.show.show"
								type="show"
								:disabled="!buttons.show.enable"
								@click="showButtonClicked"
							/>
							<Button
								class="mt-1"
								v-if="buttons.delete.show"
								lable="حذف"
								:disabled="!buttons.delete.enable"
								type="delete"
								@click="dialog = true "
							/>
						</v-col>
					</v-row>
				</v-col>

				<v-dialog v-model="dialog" max-width="700" width="500">
					<v-card>
						<v-card-title class="headline vazir">
							<p class="mb-0">
								<span>آیا مطمئن هستید؟</span>
							</p>
							<img src="/warning.png" class="dialogWarningImg" />
						</v-card-title>
						<v-card-text>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</v-card-text>
						<v-card-actions class="pl-5">
							<v-spacer></v-spacer>

							<v-btn color="error" @click="dialog = false">انصراف</v-btn>

							<v-btn color="success" @click="deleteButtonClicked">تایید</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import "./../../assets/sass/components/HeaderManager.scss";

	export default {
		data() {
			return {
				dialog: false,
				buttons: {
					insert: {
						enable: true,
						show: true
					},
					edit: {
						enable: true,
						show: true
					},
					delete: {
						enable: true,
						show: true
					},
					show: {
						enable: true,
						show: true
					},
					submit: {
						enable: true
					},
					cancel: {
						enable: true
					}
				},
				submit: false,
				cancel: false
			};
		},
		props: [
			"editMySelf",
			"buttonVisibility",
			"submitAndCancelDisable",
			"generalHeaderStatus"
		],
		mounted() {
			window.addEventListener("scroll", this.onScroll);
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.onScroll);
		},
		methods: {
			onScroll() {
				// Get the current scroll position
				const currentScrollPosition =
					window.pageYOffset || document.documentElement.scrollTop;
				// Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
				if (currentScrollPosition > 120) {
					document
						.getElementById("HeaderMangerProfileId")
						.classList.add("HeaderMangerProfileFixed");
				} else if (currentScrollPosition == 0) {
					document
						.getElementById("HeaderMangerProfileId")
						.classList.remove("HeaderMangerProfileFixed");
				}
				// Here we determine whether we need to show or hide the navbar
				this.showNavbar = currentScrollPosition < this.lastScrollPosition;
				// Set the current scroll position as the last scroll position
				this.lastScrollPosition = currentScrollPosition;
			},
			editButtonClicked() {
				this.$emit("edit");
			},
			showButtonClicked() {
				this.$emit("show");
			},
			async deleteButtonClicked() {
				this.$emit("delete");
				this.dialog = false;
			},
			insertButtonClicked() {
				this.$emit("insert");
			},
			submitButtonClicked() {
				this.submit = !this.submit;
				this.$emit("submit", this.submit);
			},
			cancelButtonClicked() {
				this.cancel = !this.cancel;
				this.$emit("cancel", this.cancel);
			},
			//
			initialBottonsStatus() {
				if (this.generalHeaderStatus === "Profile") {
					this.buttons.insert.show = false;
					this.buttons.show.show = false;
					this.buttons.delete.show = false;
				} else if (this.generalHeaderStatus === "User") {
					// همه ی دکمه ها قابل مشاهده هستند
					// ...
				} else if (this.generalHeaderStatus === "Default") {
					// همه ی دکمه ها قابل مشاهده هستند
					// ...
				}
			},
			buttonVisibilityForUserStatus(status, oldStatus) {
				if (status === "start") {
					this.buttons.insert.enable = true;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "insert") {
					this.buttons.insert.enable = false;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = false;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "selecting") {
					this.buttons.insert.enable = true;
					this.buttons.show.enable = true;
					this.buttons.edit.enable = true;
					this.buttons.delete.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "not-selected") {
					this.buttons.insert.enable = true;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "multi-selecting") {
					this.buttons.insert.enable = true;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "show") {
					this.buttons.insert.enable = false;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = true;
					this.buttons.delete.enable = true;
					this.buttons.submit.enable = false;
					this.buttons.cancel.enable = true;
				} else if (status === "edit") {
					this.buttons.insert.enable = false;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = true;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "delete") {
					this.buttons.insert.enable = true;
					this.buttons.show.enable = false;
					this.buttons.edit.enable = false;
					this.buttons.delete.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "canceled") {
					// بعد از کنسل شدن باید کدوم حالت را ایجاد کرد
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "done") {
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "failed") {
					this.setSubmitAndCancelVisibility(true);
				}
			},
			buttonVisibilityForProfileStatus(status) {
				if (status === "show") {
					this.buttons.edit.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "edit") {
					this.buttons.edit.enable = false;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "canceled") {
					this.buttons.edit.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "done") {
					this.buttons.edit.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "failed") {
					this.buttons.edit.enable = false;
					this.setSubmitAndCancelVisibility(true);
				}
			},
			buttonVisibilityForDefaultStatus(status) {
				if (status === "start") {
					this.buttons.edit.enable = false;
					this.buttons.insert.enable = true;
					this.buttons.delete.enable = false;
					this.buttons.show.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "insert") {
					this.buttons.edit.enable = false;
					this.buttons.insert.enable = false;
					this.buttons.delete.enable = false;
					this.buttons.show.enable = false;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "show") {
					this.buttons.edit.enable = true;
					this.buttons.insert.enable = false;
					this.buttons.delete.enable = true;
					this.buttons.show.enable = false;
					this.buttons.submit.enable = false;
					this.buttons.cancel.enable = true;
				} else if (status === "edit") {
					this.buttons.edit.enable = false;
					this.buttons.insert.enable = false;
					this.buttons.delete.enable = true;
					this.buttons.show.enable = false;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "selecting") {
					this.buttons.edit.enable = true;
					this.buttons.insert.enable = true;
					this.buttons.delete.enable = true;
					this.buttons.show.enable = true;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "multi-selecting") {
					this.buttons.edit.enable = false;
					this.buttons.insert.enable = true;
					this.buttons.delete.enable = true;
					this.buttons.show.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "not-selected") {
					this.buttons.edit.enable = false;
					this.buttons.insert.enable = true;
					this.buttons.delete.enable = false;
					this.buttons.show.enable = false;
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "canceled") {
					this.setSubmitAndCancelVisibility(false);
				} else if (status === "failed") {
					this.buttons.edit.enable = false;
					this.setSubmitAndCancelVisibility(true);
				} else if (status === "done") {
					this.setSubmitAndCancelVisibility(false);
				}
				// Default
			},
			// helper functions
			setSubmitAndCancelVisibility(enable) {
				this.buttons.submit.enable = enable;
				this.buttons.cancel.enable = enable;
			}
		},
		watch: {
			buttonVisibility(status, oldStatus) {
				// console.log("status", status);
				if (this.generalHeaderStatus === "User") {
					this.buttonVisibilityForUserStatus(status, oldStatus);
				} else if (this.generalHeaderStatus === "Profile") {
					this.buttonVisibilityForProfileStatus(status, oldStatus);
				} else if (this.generalHeaderStatus === "Default") {
					this.buttonVisibilityForDefaultStatus(status, oldStatus);
				}
			}
		},
		created() {
			this.initialBottonsStatus();
		}
	};
</script>

