<template>
  <div>
    <v-app-bar dark class="mainNavbar" id="mainNav">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="LeftNavBar ltr" offset-y right v-if="isAuthenticated">
        <img src="~assets/images/settings.png" class="navBarSettings" @click=" showNav = !showNav" />
        <transition name="slide-fade">
          <div class="nuxtLink rtl" v-show="showNav">
            <NuxtLink tag="v-list-item" to="/profile">
              <p>پروفایل</p>
            </NuxtLink>
            <NuxtLink tag="v-list-item" to="/reset-password">
              <p>تغییر رمز</p>
            </NuxtLink>
            <NuxtLink tag="v-list-item" to="/">
              <p @click="loggout">خروج</p>
            </NuxtLink>
          </div>
        </transition>
      </div>

      <div class="LeftNavBar ltr" offset-y right v-else>
        <img src="~assets/images/settings.png" class="navBarSettings" @click=" showNavNotAuth = !showNavNotAuth" />
        <transition name="slide-fade">
          <div class="nuxtLink rtl" v-show="showNavNotAuth">
            <NuxtLink tag="v-list-item" to="/login">
              <p>ورود</p>
            </NuxtLink>

            <NuxtLink tag="v-list-item" to="/register">
              <p>ثبت نام</p>
            </NuxtLink>
          </div>
        </transition>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary right class="aside">
      <v-list nav dense>
        <v-col cols="12">
          <p class="text-center mt-5">
            <img src="/benz.png" class="asideLogo" />
          </p>
          <h2 class="text-center mt-5">لورم ایپسوم</h2>
        </v-col>
        <v-list-item-group
          class="mt-10 text-center asideItem"
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>صفحه اصلی</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>مدیریت حساب ها</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>نامه ها</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>پروفایل</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <p class="asideCopyRight">copy right @ 2020 Rayan</p>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import "../../../assets/sass/components/Header.scss";
export default {
  data: () => ({
    showNav: false,
    showNavNotAuth: true,
    drawer: false,
    group: null,
    showNavbar: true,
    lastScrollPosition: 0
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
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
        document.getElementById("mainNav").classList.add("mainNavFixed");
      }
      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    },
    loggout() {
      this.$store.dispatch("login/loggout");
      this.$router.replace("/");
    }
  },
};
</script>