<script setup>
import { RouterLink, RouterView } from "vue-router";
import navbar from "./components/home_header/navbar.vue";
import Footer_ from "@/components/Footer_.vue";
import cart from "@/components/layout/cart.vue";

import { useAuthStore } from "./stores/auth";
const auth_store = useAuthStore();
import { useThemeStore } from "./stores/theme";
const theme = useThemeStore();
theme.toggle_theme(localStorage.getItem("theme") || "light");

import { useCartStore } from "./stores/cart";
import { computed } from "vue";
const cart_store = useCartStore();

const get_show_cart = computed(() => {
  return cart_store.show_cart;
});

// import { useRoute } from "vue-router";
// const route = useRoute();
// console.log(route);

// auto login

const token = localStorage.getItem("userToken") || "";
const userStr = localStorage.getItem("userUser");
const user = JSON.parse(userStr) || "";
auth_store.set_user(user, token);
</script>

<template>
  <navbar />
  <div class="pages" :class="[theme.theme === 'dark' ? 'bg-dark' : 'bg-light']">
    <RouterView v-slot="{ Component }">
      <transition name="route" mode="out-in" appear>
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </div>
  <Footer_
    v-if="
      $route.name !== 'auth' &&
      $route.name !== 'reset_password' &&
      $route.name !== 'product_details'
    "
  />

  <teleport to="body">
    <!-- <transition name="fade">
      <div
        class="overlay"
        @click="cart_store.close_cart"
        v-if="get_show_cart"
      ></div>
    </transition> -->
    <transition name="slide" mode="out-in">
      <div
        class="cart-cont"
        v-if="get_show_cart"
        :class="[theme.theme === 'dark' ? 'bg-dark' : 'bg-light']"
      >
        <cart />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
}
.cart-cont {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 76px;
  left: 0px;
  padding: 10px;
  z-index: 100;
  transition: all 0.3s ease;
  /* opacity: 0.5; */
}
.pages {
  padding-top: 70px;
  overflow-x: hidden;
  min-height: 100vh;
}
.route-enter-from {
  transform: translateX(-100%);
  /* transform: scale(0.2); */
  opacity: 0;
}
.route-leave-to {
  transform: translateX(100%);
  /* transform: scale(0.2); */

  opacity: 0;
}
.route-leave-from,
.route-enter-to {
  /* transform: translateX(0); */
  transform: scale(1);

  opacity: 1;
}
.route-leave-active,
.route-enter-active {
  transition: all 0.5s ease-in-out;
}
</style>
