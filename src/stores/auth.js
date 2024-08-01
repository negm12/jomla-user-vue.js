import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null,
  }),
  getters: {
    get_is_auth: function () {
      return !!this.token;
    },
  },
  actions: {
    login: async function (payload) {
      const res = await axios.post("api/shop/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      const user = await res.data;
      // .user .token
      localStorage.setItem("userToken", await res.data.token);
      localStorage.setItem("userUser", JSON.stringify(await res.data.user));

      this.set_user(await res.data.user, await res.data.token);
      console.log(user);
    },

    set_user: function (user, token) {
      this.user = user;
      this.token = token;
    },

    sign_in: async function (payload) {
      console.log(payload);
      const res = await axios.post("api/shop/auth/signin", {
        firstName: payload.fname,
        lastName: payload.lname,
        email: payload.email,
        password: payload.pass,
        image: payload.image,
      });
      console.log(await res.data);
    },

    forgot_pass: async function (email) {
      await axios.post("api/shop/auth/forgot-password", {
        email,
      });
    },
  },
});
