import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import products from "../views/products.vue";
import product_details from "../views/product_details.vue";
import login from "@/views/login.vue";
import reset_password from "@/views/reset_password.vue";
import orders from "@/views/orders.vue";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/products",
      name: "products",
      component: products,
    },
    {
      path: "/products/:id",
      name: "product_details",
      component: product_details,
    },
    {
      path: "/auth",
      name: "auth",
      component: login,
    },
    {
      path: "/reset-password/:reset_token",
      name: "reset_password",
      component: reset_password,
    },
    {
      path: "/orders",
      name: "orders",
      component: orders,
    },
  ],
});

router.beforeEach((to, form, next) => {
  const auth_store = useAuthStore();
  if (
    (to.name === "auth" || to.name === "reset_password") &&
    auth_store.get_is_auth
  ) {
    next("/");
  } else if (to.name === "orders" && !auth_store.get_is_auth) {
    console.log(auth_store.get_is_auth);
    next("/");
  } else {
    next();
  }
});

export default router;
