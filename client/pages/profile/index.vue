<template>
	<div>
		<HeaderManager
			@submit="submitEvent"
			@cancel="cancelEvent"
			@edit="headerManagerEventHandler('edit')"
			:buttonVisibility="components.headerManager.status"
			:generalHeaderStatus="components.headerManager.generalStatus"
		/>
		<Profile
			:editMode="components.profile.inputsReadonly"
			:user="user"
			:primitiveUserData="primitiveUserData"
			:defaults="defaults"
			:users="userBmans"
			:submit="submit"
			:cancel="cancel"
			:formStatus="this.components.headerManager.status"
			:creator="creator"
			:editMySelf="true"
			@done="done"
			@failed="failed"
			@canceled="canceled"
		/>
	</div>
</template>

<script>
	import Profile from "./../../components/auth/Profile";
	import getDataMixin from "./../../plugins/mixins/auth/prfile/getData";
	import HeaderManager from "./../../components/layouts/HeaderManager";

	export default {
		layout: "auth",
		middleware: ["init-auth", "is-auth"],
		mixins: [getDataMixin],
		components: {
			Profile,
			HeaderManager
		},
		data() {
			return {
				submit: false,
				cancel: false,
				user: {},
				components: {
					headerManager: { show: true, generalStatus: "Profile", status: "" },
					profile: { show: true, actionStatus: "", inputsReadonly: true }
				}
			};
		},
		async mounted() {
			this.components.headerManager.status = "show";
			// get data from backend methods in getDataMixin
			this.getAndUpdateUser();
		},
		methods: {
			async getAndUpdateUser() {
				try {
					const data = await this.getData("edit.mySelf");
					this.user = { ...data.user };
					this.primitiveUserData = { ...data.user };
					this.defaults = data.defaults;
					this.userBmans = data.userBmans;
					this.creator = data.creator;
				} catch (error) {
					this.showResponseErrors(error);
				}
			},
			submitEvent(submit) {
				this.submit = submit;
			},
			cancelEvent(cancel) {
				this.components.headerManager.status = "show";
				this.components.profile.inputsReadonly = true;
				this.cancel = cancel;

				// مشخص کردن حالت هدر و دکمه ها به حالت قبل
			},
			done() {
				this.components.profile.inputsReadonly = true;
				this.components.headerManager.status = "done";
				this.getAndUpdateUser();
			},
			failed() {
				this.components.profile.inputsReadonly = false;
				this.components.headerManager.status = "failed";
			},
			canceled() {
				this.user = { ...this.primitiveUserData };
			},
			headerManagerEventHandler(status) {
				this.components.profile.actionStatus = status;
				if (status == "edit") {
					this.components.profile.inputsReadonly = false;
					this.components.headerManager.status = status;
				} else if (status == "show") {
					this.components.profile.inputsReadonly = true;
					this.components.headerManager.status = status;
				}
			}
		}
	};
</script>