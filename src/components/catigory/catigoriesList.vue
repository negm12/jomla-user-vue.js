<template>
  <div class="container ctatigories mt-16">
    <swiper
      :spaceBetween="0"
      :breakpoints="breakpoints"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :modules="modules"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(cat, i) in catigories" :key="i">
        <catigoryItem :cat />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import catigoryItem from "@/components/catigory/catigoryItem.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/a11y";
import { Navigation, Autoplay, EffectCreative } from "swiper/modules";
import { computed, ref } from "vue";
import axios from "axios";

export default {
  components: {
    Swiper,
    SwiperSlide,
    catigoryItem,
  },
  setup() {
    const catigories = ref([]);

    (async () => {
      try {
        const res = await axios.get("api/shop/catigory");
        // const res = await axios.get("http://127.0.0.1:3000/api/shop/catigory");

        catigories.value = await res.data.data;
        // console.log(catigories.value);
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
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },

        500: {
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        900: {
          slidesPerView: 3,
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
    return {
      modules: [Navigation, Autoplay, EffectCreative],
      breakpoints,
      catigories,
    };
  },
};
</script>

<style lang="scss" scoped></style>
