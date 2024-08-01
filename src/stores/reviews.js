import axios from "axios";
import { defineStore } from "pinia";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: "",
  }),
  getters: {},
  actions: {
    fetch_reviews: async function () {
      const res = await axios.get("api/shop/reviews?public=public");
      this.reviews = await res.data.reviews;
    },
  },
});
