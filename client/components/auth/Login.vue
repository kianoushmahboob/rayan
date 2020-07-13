<template>
	<div>
		<v-container fluid class="containerLogin ltr">
			<v-row>
				<v-col class="relative" cols="12" md="4">
					<v-row>
						<v-col cols="12">
							<p class="text-center">
								<img src="~assets/images/earth.png" />
							</p>
						</v-col>

						<v-col cols="12" class="pt-0">
							<h2>لورم ایپسوم</h2>
							<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،</p>
						</v-col>
						<v-col>
							<NuxtLink tag="button" type="button" to="/" v-if="!isAuthenticated">خانه</NuxtLink>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="8">
					<form @submit.prevent="submit" class="rtl">
						<v-row class="rowLogin">
							<v-col cols="12">
								<h2 class="text-center">ورود</h2>
							</v-col>
							<v-col cols="12" md="12" class="custompaddinLogin">
								<Input v-model="TU_FUserName" lable="نام کاربری" name="TU_FUserName" required icon="user" />
							</v-col>

							<v-col cols="12" md="12" class="custompaddinLogin">
								<Input v-model="TU_FPassWord" lable="رمز عبور" name="TU_FPassWord" required icon="lock" />
							</v-col>
							<v-col cols="12" md="12" class="custompaddinLogin">
								<v-row>
									<v-checkbox v-model="rememberMeCheckbox" label="مرا به خاطر بسپار"></v-checkbox>
									<NuxtLink class="forgetPassword" to="forget-password">فراموشی کلمه عبور</NuxtLink>
								</v-row>
							</v-col>
							<v-row class="custompaddinLogin">
								<v-col cols="12">
									<button class="button" type="submit">ورود</button>
								</v-col>
							</v-row>
						</v-row>
					</form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
	import "./../../assets/sass/components/auth/Login.scss";

	export default {
		layout: "auth",

		data() {
			return {
				pageTitle: "Login",
				rememberMeCheckbox: false,
				TU_FUserName: "",
				TU_FPassWord: ""
			};
		},
		methods: {
			async submit() {
				const userData = {
					TU_FUserName: this.TU_FUserName,
					TU_FPassWord: this.TU_FPassWord,
					rememberMe: this.rememberMeCheckbox
				};

				try {
					// const response = await this.$axios.$get("https://dadeoloom.ir/api/defaults");
					// console.log('response', response)
					const response = await this.$axios.$post("login", userData);

					this.$store.dispatch("login/login", response);
					this.$router.replace("/");
				} catch (error) {
					console.log(error);
					this.showResponseErrors(error);
				}
			}
		}
	};
</script>

<style>
</style>
