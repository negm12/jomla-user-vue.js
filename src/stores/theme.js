import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
  }),
  getters: {},
  actions: {
    toggle_theme: function (payload) {
      localStorage.setItem("theme", payload);

      this.theme = localStorage.getItem("theme");
      // console.log(theme.value);
      // console.log(theme.value);
    },
  },
});
