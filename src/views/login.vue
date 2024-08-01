<template>
  <div class="login">
    <div class="container">
      <transition name="fade" mode="out-in">
        <div class="auth" v-if="!forgot">
          <transition name="fade" mode="out-in">
            <div class="login-com" v-if="login_mode === 'login'">
              <login />
              <span class="forgot" @click="toggle_forgot">forgot password</span>
              <span
                class="signin"
                :style="{ marginLeft: '30px' }"
                @click="toggle_login('signin')"
                >create account
              </span>
            </div>

            <div class="signin_comp" v-else>
              <signin @go_login="toggle_login" />
              <span class="signin" @click="toggle_login('login')"
                >login instead
              </span>
            </div>
          </transition>
        </div>

        <div class="forgot-pss" v-else>
          <forgot_pass />
          <span class="forgot" @click="toggle_forgot">back to login</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import login from "@/components/auth/login.vue";
import signin from "@/components/auth/signin.vue";
import forgot_pass from "@/components/auth/forgot_pass.vue";
import { useThemeStore } from "@/stores/theme";
const theme = useThemeStore();

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();

import { reactive, ref } from "vue";

const login_mode = ref("login");
const toggle_login = (mode) => {
  login_mode.value = mode;
};

// sign in
const forgot = ref(false);
const toggle_forgot = () => {
  forgot.value = !forgot.value;
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
  padding-top: 70px;
  min-height: calc(100vh - 60px);
}
.forgot,
.signin {
  color: var(--update-color);
  text-decoration: underline;
  cursor: pointer;
  margin: 20px 0;
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
  text-align: center;
}
</style>
