<template>
  <div class="products-list">
    <!-- <div class="container"> -->
    <transition-group name="list" tag="div" class="container">
      <product_item v-for="(prod, i) in products" :key="i" :prod />
    </transition-group>
    <!-- </div> -->
  </div>
</template>

<script setup>
import product_item from "@/components/product_item.vue";
import axios from "axios";
import { computed, ref } from "vue";

const props = defineProps(["search_value"]);

// const products = ref([]);
import { useProductStore } from "@/stores/product";
const prod_store = useProductStore();

import { useRoute } from "vue-router";
const route = useRoute();
(async () => {
  await prod_store.fet_products(route.query);
})();

const products = computed(() => {
  return prod_store.products.filter((prod) =>
    prod.name.match(props.search_value)
  );
});
</script>

<style lang="scss" scoped>
.products-list {
  padding-top: 25px;
  .container {
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    row-gap: 40px;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
