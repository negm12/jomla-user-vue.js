import "./assets/style/main.scss";
import "./assets/style.css";

import axios from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// app.config.globalProperties.$axios = axios;

app.config.globalProperties.$axios = axios;
// axios.defaults.baseURL = "http://127.0.0.1:3000/";
axios.defaults.baseURL = "https://jomla-shop-node-js.vercel.app/";

app.use(createPinia());
app.use(router);

app.mount("#app");
