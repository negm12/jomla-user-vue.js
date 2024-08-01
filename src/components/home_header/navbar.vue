<template>
  <nav
    class="fixed z-50 w-full"
    :class="[
      theme_store.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light',
    ]"
  >
    <div class="container flex justify-between">
      <div class="logo">
        <router-link to="/" @click="cart_store.close_cart()">
          <img class="w-40" src="../../assets/images/logo.png" alt="logo" />
        </router-link>

        <!-- 
        cart
        -->
        <div
          @click="cart_store.toggle_cart()"
          class="cart"
          :class="[theme_store.theme === 'dark' ? 'bg-dark' : 'bg-light']"
        >
          <div class="count" v-if="!!cart_store.get_cart?.length">
            {{ cart_count }}
            <!-- {{ cart_store.get_cart }} -->
          </div>
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <!-- 
        
        
        -->
      </div>
      <div
        class="links flex-1 md:flex-[.7]"
        v-if="show_mob_menu"
        :class="[
          theme_store.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light',
        ]"
      >
        <div>
          <theme />
        </div>
        <router-link to="/" @click="cart_store.close_cart()">home</router-link>
        <router-link :to="{ name: 'products' }" @click="cart_store.close_cart()"
          >products</router-link
        >
        <!-- <router-link to="/">cart</router-link> -->
        <router-link
          to="/auth"
          @click="cart_store.close_cart()"
          v-if="!auth_store.get_is_auth"
          >login</router-link
        >
        <div
          class="user"
          v-if="auth_store.get_is_auth"
          :style="{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
          }"
        >
          <!-- profile link -->
          <router-link :to="{ name: 'orders' }" @click="cart_store.close_cart()"
            >your orders</router-link
          >

          <!-- profile image -->
          <div
            class="image"
            :style="{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
            }"
          >
            <img
              @click.prevent="show_update_profile"
              :src="auth_store.user.image"
              alt=""
              :style="{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
              }"
            />
          </div>

          <!-- log out  -->
          <div
            class="logout"
            :class="[theme_store.theme === 'dark' ? 'bg-dark' : 'bg-light']"
            @click="logout"
            :style="{
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }"
          >
            logout
          </div>
        </div>
      </div>
      <div class="mobile-menue" @click="toggle_mob_menu">
        <i class="fa-solid fa-bars"></i>
      </div>
    </div>
  </nav>

  <teleport to="body">
    <transition name="fade">
      <form_modal v-if="open_update_profile" @close="close_update_profile">
        <template #title>
          <h2>update my profile</h2>
        </template>
        <template #content>
          <update_profile @close="close_update_profile" />
        </template>
      </form_modal>
    </transition>
  </teleport>
</template>

<script setup>
import theme from "../layout/theme.vue";
import { computed, ref } from "vue";
import form_modal from "../form_modal.vue";
import update_profile from "../update_profile.vue";

import { useThemeStore } from "@/stores/theme";
const theme_store = useThemeStore();

const open_update_profile = ref(false);
const show_update_profile = () => {
  console.log(open_update_profile.value);
  open_update_profile.value = true;
};
const close_update_profile = () => {
  open_update_profile.value = false;
};

import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const auth_store = useAuthStore();
const show_mob_menu = ref(false);
(() => {
  document.documentElement.clientWidth >= 768
    ? (show_mob_menu.value = true)
    : (show_mob_menu.value = false);
  // console.log(document.documentElement.clientWidth, show_mob_menu.value);
})();
window.addEventListener("resize", (e) => {
  document.documentElement.clientWidth >= 768
    ? (show_mob_menu.value = true)
    : (show_mob_menu.value = false);
});
const toggle_mob_menu = () => {
  show_mob_menu.value = !show_mob_menu.value;
};

import { useCartStore } from "@/stores/cart";
const cart_store = useCartStore();

// console.log(cart_store.get_cart.length);
const cart_count = computed(() => {
  // console.log(cart_store.get_cart.length);
  return cart_store.get_cart?.length < 10 ? cart_store.get_cart?.length : "+9";
});
// console.log("computed", cart_count.value);

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userUser");
  // window.addEventListener("load", () => {});
  location.reload();
};
</script>

<style lang="scss" scoped>
.logo {
  // height: 30px;
  display: flex;
  justify-content: center;
  place-items: center;
  gap: 30px;
  .cart,
  .favs {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    position: relative;
    .count {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--danger-color);
      display: flex;
      align-items: center;
      justify-content: center;
      top: -7px;
      right: -7px;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
    }
  }
  a {
    width: 100px;
    background-color: transparent !important;
  }
}
@media (max-width: 767px) {
  nav {
    // height: 60px;
    .container {
      position: relative;
    }
    .links {
      position: absolute;
      width: 100%;
      top: 62px;
      right: 0;
      flex-direction: column;
      padding: 30px 0;
      a {
        display: block;
        width: 100%;
        text-align: left;
        padding: 10px;
        margin: 10px;
      }
      .user {
        flex-direction: column;
        width: 100%;
      }
    }
    .mobile-menue {
      display: block;
      cursor: pointer;
    }
  }
}
.links {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  align-items: center;
  box-shadow: none !important;
  // text-align: right;
  // a:not(:last-of-type) {
  //   margin-right: 20px;
  // }
  // a {
  //   padding: 5px 10px;
  //   background-color: #eee;
  //   border-radius: 5px;
  // }
}
.mobile-menue {
  display: none;
}

a {
  transition: all 0.3s ease-in-out;
  padding: 5px;
}
.router-link-active,
a:hover {
  // color: ;
  border-radius: 5px;
  background-color: var(--main-color);
  color: black;
}
</style>
