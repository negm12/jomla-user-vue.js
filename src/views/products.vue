<template>
  <div class="products">
    <filter_bar
      :search_value
      @update_search_value="update_search_value"
      @update_sort_value="update_sort_value"
      @update_catigory_value="update_catigory_value"
    />
    <products_list :search_value />
  </div>
</template>

<script setup>
import filter_bar from "@/components/filter_bar.vue";
import products_list from "@/components/products_list.vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

import { useProductStore } from "@/stores/product";
const prod_store = useProductStore();
const search_value = ref("");

const update_search_value = (value) => {
  search_value.value = value;
};

const update_sort_value = (value) => {
  router.push({
    name: "products",
    query: {
      ...route.query,
      sort: value,
    },
  });
  // console.log(route.query);
  // prod_store.fet_products(route.query);
};
const update_catigory_value = (value) => {
  router.push({
    name: "products",
    query: {
      ...route.query,
      catigory: value,
    },
  });
  // prod_store.fet_products(route.query);
};

watch(
  () => route.query,
  () => {
    prod_store.fet_products(route.query);
  }
);
</script>

<style lang="scss" scoped></style>
