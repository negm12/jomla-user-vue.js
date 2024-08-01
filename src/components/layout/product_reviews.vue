<template>
  <swiper
    :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
    :watchSlidesProgress="true"
    :slidesPerView="2"
    :loop="true"
    class="mySwiper"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :style="{
      padding: '20px 0 ',
    }"
  >
    <swiper-slide
      :class="[theme.theme === 'dark' ? 'bg-dark' : 'bg-light']"
      v-for="(rev, i) in reviews"
      :key="i"
      ><Testemonial :review="rev" />
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Testemonial from "../../components/home_header/testemonial.vue";
import { useThemeStore } from "@/stores/theme";

// import "./style.css";

export default {
  props: ["reviews"],
  components: {
    Swiper,
    SwiperSlide,
    Testemonial,
  },
  setup() {
    const theme = useThemeStore();
    return { modules: [Autoplay], theme };
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  padding: 20px;
  display: flex;
  align-items: center;
  // justify-content: center;
  border-radius: 18px;
  color: var(--main-text-color);
  overflow: visible;
  margin: 0 10px;
  // box-shadow: var(--main-shadow);
}
</style>
