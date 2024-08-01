import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  getters: {},
  actions: {
    fet_products: async function (query) {
      let url;
      if (query.catigory && query.sort) {
        url = `api/shop/products?sort=${query?.sort}&catigory=${query?.catigory}`;
      } else if (query.catigory && !query.sort) {
        url = `api/shop/products?catigory=${query?.catigory}`;
      } else if (query.sort && !query.catigory) {
        url = `api/shop/products?sort=${query?.sort}`;
      } else {
        url = "api/shop/products";
      }
      const res = await axios.get(`${url}`);
      this.products = await res.data.products;
      // console.log(this.products);
    },
  },
});
