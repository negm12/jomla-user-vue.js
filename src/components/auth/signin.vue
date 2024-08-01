<template>
  <div class="sign">
    <transition name="fade" mode="out-in">
      <form
        @submit.prevent="signin"
        :class="[
          theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light',
        ]"
      >
        <h2>ceate account</h2>

        <div class="input-group">
          <label>first name </label>
          <input type="text" required v-model="new_user.fname" />
        </div>

        <div class="input-group">
          <label>last name</label>
          <input type="text" required v-model="new_user.lname" />
        </div>

        <div class="input-group">
          <label>email</label>
          <input type="email" required v-model="new_user.email" />
        </div>
        <!-- <p class="err" v-if="email_err">{{ email_err }}</p> -->
        <div class="input-group">
          <label>password</label>
          <input type="password" required v-model="new_user.pass" />
        </div>

        <div class="input-group">
          <label>password confirm</label>
          <input type="password" required v-model="new_user.pass_confirm" />
        </div>

        <div class="input-group">
          <label>catigory image</label>
          <input
            type="file"
            @change="on_file_change"
            :style="{ display: 'none' }"
            ref="file"
          />
          <div class="image">
            <div class="btn-file" @click="click_on_file">choose your image</div>
            <div class="img-review">
              <img :src="img_url_review" alt="" v-if="img_url_review" />
            </div>
          </div>
        </div>
        <!-- <p class="err" v-if="pass_err">{{ pass_err }}</p> -->
        <button>create</button>
      </form>
    </transition>

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

import { reactive, ref } from "vue";
import axios from "axios";

const img_url_review = ref("");
const image = ref(null);

const file = ref(null);
const click_on_file = () => {
  file.value.click();
};

const on_file_change = (e) => {
  image.value = e.target.files[0];
  const filereader = new FileReader();
  filereader.addEventListener("load", () => {
    img_url_review.value = filereader.result;
  });
  filereader.readAsDataURL(e.target.files[0]);
};

const emits = defineEmits(["go_login"]);

const error = ref({});

const close_error = () => {
  error.value = {};
};

const load = ref(false);

const new_user = reactive({
  fname: "",
  lname: "",
  email: "",
  pass: "",
  pass_confirm: "",
  image: "",
});

import { storage } from "@/firbase/firebase";
import { uploadBytes, getDownloadURL, ref as storeRef } from "firebase/storage";

const signin = async () => {
  load.value = true;
  console.log(new_user);
  // check if pass and confirm pass is equal
  // upload image
  // sign in
  // go to login
  try {
    if (new_user.pass !== new_user.pass_confirm) {
      error.value = {
        state: "error",
        message: "password and confirmation password not the same",
      };
      load.value = false;
      return;
    }

    if (image.value) {
      const storage_ref = storeRef(storage, `users/${new_user.email}`);
      await uploadBytes(storage_ref, image.value);
      new_user.image = await getDownloadURL(storage_ref);
    }

    await auth_store.sign_in(new_user);
    // router.push("/auth");
    emits("go_login", "login");
  } catch (err) {
    error.value = err.response.data;
    load.value = false;
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
.modal {
  z-index: 112;
}
</style>
