<template>
  <div class="reset">
    <!-- forgot pass -->
    <form
      @submit.prevent="send_reset_token"
      class="forgot-form"
      :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
    >
      <div class="input-group">
        <label>your email</label>
        <input type="email" required v-model="email_for_reset_pass" />
      </div>
      <div class="send" v-if="send">check your email for reset link</div>
      <button>send</button>
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

// import { useRoute, useRouter } from "vue-router";
// const router = useRouter();
// const route = useRoute();

import { reactive, ref } from "vue";
import axios from "axios";

const error = ref({});

const close_error = () => {
  error.value = {};
};

const load = ref(false);

// sign in

const email_for_reset_pass = ref("");
const send = ref(false);
const send_reset_token = async () => {
  load.value = true;
  try {
    await axios.post(
      "api/shop/auth/forgot-password",
      {
        email: email_for_reset_pass.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    send.value = true;
  } catch (err) {
    error.value = err.response.data;
    // console.log(err.response.data);
  }
  load.value = false;
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
  // height: 100vh;
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

.forgot,
.signin {
  color: var(--update-color);
  text-decoration: underline;
  cursor: pointer;
  margin: 20px 0;
}
.send {
  padding: 10px;
  border-radius: 10px;
  color: var(--main-text-color);
  background-color: var(--agree-color);
  margin-bottom: 10px;
}
</style>
