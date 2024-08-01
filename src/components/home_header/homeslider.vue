<template>
  <swiper
    :navigation="true"
    :modules="modules"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :loop="true"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(slide, idx) in slides"
      :key="idx"
      :style="{ backgroundImage: 'url(' + slide.img + ')' }"
    >
      <!-- <div class="overlay"></div> -->
      <div class="intro">
        <p class="uppercase text-1xl md:text-2xl mb-2 font-bold text-gray-500">
          welcome to fashion
        </p>
        <h1
          class="text-4xl md:text-6xl lg:text-7xl text-gray-800 uppercase font-bold"
        >
          {{ slide.name }}
        </h1>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { reactive, ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const slides = ref([
      {
        img: new URL(
          "../../assets/images/homeslider/slide1.jpg",
          import.meta.url
        ).href,
        name: "men fashion",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide3.jpg",
          import.meta.url
        ).href,
        name: "men shose",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide4.jpg",
          import.meta.url
        ).href,
        name: "materials",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide5.jpg",
          import.meta.url
        ).href,
        name: "vegetables",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide6.jpg",
          import.meta.url
        ).href,
        name: "bags",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide7.jpg",
          import.meta.url
        ).href,
        name: "beuty pets",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide8.jpg",
          import.meta.url
        ).href,
        name: "fresh flowers",
      },
      {
        img: new URL(
          "../../assets/images/homeslider/slide9.jpg",
          import.meta.url
        ).href,
        name: "fresh vegetables",
      },
    ]);
    return {
      modules: [Navigation, Autoplay],
      slides,
    };
  },
};
</script>
<style lang="scss" scoped>
.swiper {
  height: calc(100vh - 100px);
  // clip-path: polygon(0 0, 100% 0, 100% calc(100% - 150px), 0 100%);
  .swiper-slide {
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
  }
}
.intro {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  z-index: 101;
}
// .swiper-button-prev::after,
// .swiper-button-next::after {
//   @apply text-gray-800;
//   color: red;
// }
// .swiper-button-prev,
// .swiper-button-next {
//   color: red !important;
//   font-size: 20px !important;
// }
// .swiper-button-prev,
// .swiper-button-next {
//   color: var(--main-text-color);
// }
</style>
