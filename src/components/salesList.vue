<template>
  <div class="sales">
    <section_header>
      <p class="sec-head-p">special offer</p>
      <h2 class="sec-head-h2">top sales</h2>
    </section_header>
    <div class="container">
      <p class="load" v-if="load">loading...............</p>
      <product_item
        v-for="(prod, i) in sales_prods"
        :key="i"
        :prod
        badge="sale"
      />
    </div>
  </div>
</template>

<script setup>
import product_item from "@/components/product_item.vue";
import section_header from "../components/layout/section_header.vue";
import { ref } from "vue";
import axios from "axios";

const sales_prods = ref([]);
const load = ref(false);
(async () => {
  load.value = true;
  try {
    const res = await axios.get(
      "api/shop/products?sale[$ne]=0&sort=-sale&limit=10"
    );
    sales_prods.value = await res.data.products;
    // console.log(sales_prods.value);
  } catch (err) {
    console.log(err);
  }
  load.value = false;
})();
</script>

<style lang="scss" scoped>
.container {
  // display: grid;
  // // width: 200px;
  // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  row-gap: 40px;
}
</style>
