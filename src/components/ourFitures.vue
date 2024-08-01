<template>
  <div class="fetures">
    <div class="container">
      <div class="feture" v-for="(fet, index) in fetures" :key="index">
        <div class="image">
          <i class="fa-solid" :class="fet.icon"></i>
        </div>
        <div class="fet-body">
          <h2 class="name">{{ fet.name }}</h2>
          <p class="desc">{{ fet.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const fetures = ref([
  {
    icon: "fa-truck-moving",
    name: "FREE SHIPPING",
    desc: "Free Shipping World Wide",
  },
  {
    icon: "fa-clock",
    name: "24 X 7 SERVICE",
    desc: "Online Service For New Customer",
  },
  {
    icon: "fa-microphone",
    name: "FESTIVAL OFFER",
    desc: "New Special Festival Offer",
  },
]);
</script>

<style lang="scss" scoped>
.fetures {
  padding: 30px 0;
  .container {
    padding: 20px 0;
    border-top: 1px solid var(--main-text-color);
    border-bottom: 1px solid var(--main-text-color);
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    .feture {
      padding: 20px;
      display: flex;
      align-items: center;
      @media (max-width: 599px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }
      &:not(:last-of-type) {
        border-right: 1px solid var(--main-text-color);
        @media (max-width: 1023px) {
          border-right: none;
        }
      }
      &:hover {
        .name {
          color: var(--main-color);
        }
      }

      .image {
        color: var(--main-color);
        font-size: 60px;
        padding-right: 15px;
      }
      .fet-body {
        font-weight: bold;
        .name {
          font-size: 20px;
          transition: all 0.3s ease-in-out;
        }
        .desc {
          font-size: 14px;
          color: var(--main-text-color);
        }
      }
    }
  }
}
</style>
