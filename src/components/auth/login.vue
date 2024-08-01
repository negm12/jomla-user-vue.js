<template>
  <div class="login">
    <form
      @submit.prevent="login"
      :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
    >
      <h2>login</h2>
      <div class="input-group">
        <label>email</label>
        <input type="email" required v-model="email" />
      </div>
      <div class="input-group">
        <label>password</label>
        <input type="password" required v-model="pass" />
      </div>

      <button>login</button>
    </form>
    <loading v-if="load"></loading>
    <teleport to="body">
      <transition name="fade">
        <modal v-if="error.state" @close="close_error" mode="error">
          <template #header> {{ error.state }}</template>
          <template #content>{{ error.message }}</template>
        </modal>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import loading from "../layout/loading.vue";
import modal from "../layout/modal.vue";
import { useThemeStore } from "@/stores/theme";
const theme = useThemeStore();

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import { ref } from "vue";
import axios from "axios";

const email = ref();
const pass = ref();

const error = ref({});

const close_error = () => {
  error.value = {};
};

const load = ref(false);

const login = async () => {
  load.value = true;
  try {
    await auth_store.login({ email: email.value, password: pass.value });
    router.push("/");
  } catch (err) {
    error.value = err.response.data;
    // console.log(err);
  }
  load.value = false;
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
  padding-top: 70px;
}
form {
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  h2 {
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 25px;
    text-transform: capitalize;
    text-align: center;
  }
}
</style>
