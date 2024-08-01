<template>
  <div
    class="testemonials"
    :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
  >
    <section_header>
      <h2 class="sec-head-h2">reviews</h2>
    </section_header>
    <div class="container">
      <swiper
        :spaceBetween="0"
        :breakpoints="breakpoints"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        class="mySwiper"
      >
        <swiper-slide
          :class="[theme.theme === 'dark' ? 'bg-dark' : 'bg-light']"
          v-for="(review, index) in rev_store.reviews"
          :key="index"
        >
          <testemonial :review />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { Navigation, Autoplay } from "swiper/modules";
import { ref, computed } from "vue";
import testemonial from "@/components/home_header/testemonial.vue";
import section_header from "@/components/layout/section_header.vue";

import { useThemeStore } from "@/stores/theme";
const theme = useThemeStore();

import { useReviewStore } from "@/stores/reviews";
const rev_store = useReviewStore();
(async () => {
  try {
    await rev_store.fetch_reviews();
  } catch (err) {
    console.log(err);
  }
})();

const breakpoints = computed(() => {
  return {
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
    300: {
      slidesPerView: 1,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },

    500: {
      slidesPerView: 1,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 15,
      slidesPerGroup: 1,
    },
  };
});
</script>

<style lang="scss" scoped>
.testemonials {
  padding: 100px 0;
  overflow: hidden;
  // padding: 50px 0;
  clip-path: polygon(0 100px, 100% 0, 100% calc(100% - 100px), 0 100%);
  // background-image: linear-gradient(
  //     to right bottom,
  //     rgb(189 12 175 / 33%),
  //     rgb(255 0 129 / 23%)
  //   ),
  //   url("../../assets/images/homeslider/rev.jpg");
  // background-color: #f7f7f7;
  // background-size: cover;
  // background-position: top;
  // background-attachment: fixed;
}

.swiper-slide {
  padding: 20px;
  display: flex;
  align-items: center;
  // justify-content: center;
  border-radius: 18px;
  color: var(--main-text-color);
  overflow: visible;
  // box-shadow: var(--main-shadow);
}

// .swiper-slide:nth-child(odd) {
//   background-color: #00b1af;
// }
// .swiper-slide:nth-child(even) {
//   background-color: #006463;
// }
</style>
