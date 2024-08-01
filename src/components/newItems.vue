<template>
  <div class="new-items">
    <section_header>
      <p class="sec-head-p">Exclusive Products</p>
      <h2 class="sec-head-h2">new arrivals</h2>
    </section_header>
    <div class="container">
      <product_item v-for="(prod, i) in new_items" :key="i" :prod />
    </div>
  </div>
</template>

<script setup>
import section_header from "@/components/layout/section_header.vue";
import product_item from "@/components/product_item.vue";
import axios from "axios";
import { ref } from "vue";

const new_items = ref([]);
(async () => {
  try {
    const res = await axios.get("api/shop/products?sort=-createdAt&limit=10");
    new_items.value = await res.data.products;
  } catch (err) {
    console.log(err);
  }
})();
</script>

<style lang="scss" scoped>
.new-items {
  padding: 50px 0;
  .container {
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    // display: flex;
    // flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    row-gap: 40px;
  }
}
</style>
