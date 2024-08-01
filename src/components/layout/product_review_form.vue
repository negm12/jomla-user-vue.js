<template>
  <div class="form">
    <div class="rating">
      rating:
      <starRating v-model:rating="rating" :increment="0.5" :star-size="30" />
    </div>
    <form @submit.prevent="submit">
      <textarea
        type="text"
        rows="5"
        v-model="review"
        placeholder="type your review "
      ></textarea>
      <span
        class="length_error"
        v-if="available_review_length <= 0"
        :style="{ color: 'var(--danger-color)', fontWeight: 'bold' }"
        >available letters is 150 letter only
      </span>
      <span
        v-else
        :style="{
          fontWeight: 'bold',
          fontSize: '20px',
          color: 'var(--update-color)',
        }"
      >
        availabe letters : {{ available_review_length }}</span
      >

      <button>send review</button>
    </form>
    <loading v-if="load"></loading>
  </div>
</template>

<script setup>
import starRating from "vue-star-rating";
import loading from "./loading.vue";
import { computed, ref } from "vue";
import axios from "axios";
const review_title = ref("");
const review = ref("");
const rating = ref(1);

const available_review_length = computed(() => {
  return 150 - review.value.length;
});

const load = ref(false);
const emits = defineEmits("send_review");
const submit = async () => {
  load.value = true;
  emits(
    "send_review",
    rating.value,
    review.value,
    available_review_length.value
  );
  // if (auth_store.get_is_auth) {
  //   // console.log(available_review_length.value);
  //   if (available_review_length.value <= 0) {
  //     return;
  //   }
  //   try {
  //     const res = await axios.post(
  //       "/reviews",
  //       {
  //         rating: rating.value,
  //         review: review.value,
  //         user: auth_store.user._id,
  //         public: "public",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${auth_store.token}`,
  //         },
  //       }
  //     );
  //     // console.log(await res.data);
  //     await rev_store.fetch_reviews();
  review.value = "";
  rating.value = "";
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // } else {
  //   router.push("/auth");
  // }
  load.value = false;
};
</script>

<style lang="scss" scoped>
.form {
  // background-color: aqua;
  form {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    width: 400px;
    margin-bottom: 50px;
    input {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px 5px;
      border-bottom: 2px solid var(--main-text-color);
      outline: none;
    }
    textarea {
      resize: none;
      margin-top: 10px;
      border: 2px solid var(--main-text-color);
      outline: none;
      border-radius: 5px;
      font-size: 20px;
      padding: 5px;
    }
  }
}
</style>
