<template>
  <div
    class="filter-bar"
    :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
  >
    <div class="container">
      <div class="filter">
        <div class="sort">
          <select
            :value="$route.query.sort || `sort by`"
            @change="emit('update_sort_value', $event.target.value)"
          >
            <option hidden>sort by</option>
            <option value="price">sort by price [A-Z]</option>
            <option value="-price">sort by price [Z-A]</option>
            <option value="-ratingAvg">sort by top rated</option>
            <option value="-sale">sort by sales</option>
          </select>
        </div>
        <div class="catigory">
          <select
            :value="$route.query.catigory || `catigory`"
            @change="emit('update_catigory_value', $event.target.value)"
          >
            <option hidden>catigory</option>
            <option v-for="(cat, i) in catigories" :key="i" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="search">
        <input
          type="search"
          placeholder="search by product name"
          :value="props.search_value"
          @input="emit('update_search_value', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";
import axios from "axios";
import { ref } from "vue";
const theme = useThemeStore();
const props = defineProps(["search_value"]);
const emit = defineEmits([
  "update_search_value",
  "update_sort_value",
  "update_catigory_value",
]);

const catigories = ref([]);
(async () => {
  const res = await axios.get("api/shop/catigory");
  catigories.value = await res.data.data;
})();
</script>

<style lang="scss" scoped>
.filter-bar {
  width: 100%;
  padding: 5px 0;
  // background-color: #eee;
  margin-top: 10px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 20px;
    }
    .filter {
      // width: 0px;
      display: flex;
      gap: 20px;
      select {
        width: 200px;
        padding: 10px;
        border-bottom: 2px solid var(--main-text-color);
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        color: black;
      }
    }
    .search {
      width: 300px;
      input {
        width: 100%;
        padding: 10px;
        border-bottom: 2px solid var(--main-text-color);
        outline: none;
        border-radius: 5px;
        color: black;
      }
    }
  }
}
</style>
