import axios from "axios";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")),
    show_cart: false,
  }),
  getters: {
    get_cart: function () {
      return this.cart;
    },
  },
  actions: {
    add_to_cart: function (payload) {
      // prod_id , peoduct, color , size , qty
      const cart_items = JSON.parse(localStorage.getItem("cart")) || [];
      const product = cart_items.find(
        (item) => item.product_id === payload.product_id
      );
      if (!!product) {
        product.qty += payload.qty;
      } else {
        cart_items.push(payload);
      }
      // console.log(product);

      // this.cart.push(payload);
      localStorage.setItem("cart", JSON.stringify(cart_items));
      this.cart = cart_items;
    },

    remove_from_cart: function (prod_id) {
      this.cart = this.cart.filter((item) => item.product_id !== prod_id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    remove_cart: function () {
      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    toggle_cart: function () {
      this.show_cart = !this.show_cart;
      // console.log(this.show_cart);
    },
    close_cart: function () {
      this.show_cart = false;
    },
  },
});
