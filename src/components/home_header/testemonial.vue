<template>
  <div class="testemonial relative">
    <div
      class="delete"
      @click="delete_review(review._id)"
      v-if="review.user._id === auth_store.user._id"
    >
      <i class="fa-regular fa-trash-can"></i>
    </div>
    <div class="user-info">
      <div class="image">
        <img :src="review.user.image" alt="" />
      </div>
      <div class="info">
        <h2 class="name">{{ review.user.firstName }}</h2>
        <div class="rating">
          <starRating
            :read-only="true"
            :rating="review.rating"
            :increment="0.5"
            :star-size="17"
          />
        </div>
      </div>
    </div>
    <div class="text">
      {{ review.review }}
    </div>
  </div>
  <loading v-if="load"></loading>
</template>

<script setup>
import starRating from "vue-star-rating";
import loading from "../layout/loading.vue";
const props = defineProps(["review"]);
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import axios from "axios";
const auth_store = useAuthStore();

const load = ref(false);

import { useReviewStore } from "@/stores/reviews";
const rev_store = useReviewStore();
const delete_review = async (id) => {
  load.value = true;
  try {
    await axios.delete(`api/shop/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${auth_store.token}`,
      },
    });
    await rev_store.fetch_reviews();
  } catch (err) {
    console.log(err.response.data);
  }
  load.value = false;
};
</script>

<style lang="scss" scoped>
.testemonial {
  height: 300px;
  text-wrap: wrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--danger-color);
    display: grid;
    place-items: center;
    color: #fff;
  }
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  .image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--main-text-color);
    padding: 2px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 17px;
    font-weight: bolder;
    text-transform: uppercase;
  }
  .rating {
    text-align: center;
  }
  .text {
    padding: 20px 0;
    line-height: 1.7;
    letter-spacing: 1.5px;
    position: relative;
    text-align: center;
    &::before {
      content: "،،";
      position: absolute;
      top: -40px;
      left: 0px;
      font-size: 40px;
      font-weight: bold;
    }
    &::after {
      content: ",,";
      position: absolute;
      bottom: -20px;
      right: 0px;
      font-size: 40px;
      font-weight: bold;
    }
  }
}
</style>
