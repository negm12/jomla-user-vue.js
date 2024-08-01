<template>
  <footer
    class="footer"
    :class="[theme.theme === 'dark' ? 'bg-dark' : 'bg-light']"
  >
    <!-- <div class="container"> -->
    <div class="form-location">
      <div class="write-review">
        <review_form />
      </div>
      <div class="location">
        <location />
      </div>
    </div>
    <!-- </div> -->
    <div
      class="final-footer"
      :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
    >
      @copyrights <span>mohamed negm </span>2024
    </div>
  </footer>
</template>

<script setup>
import review_form from "@/components/review_form.vue";
import location from "@/components/location.vue";
import { useThemeStore } from "@/stores/theme";
const theme = useThemeStore();
</script>

<style lang="scss" scoped>
.form-location {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  // @media (max-width: 1023px) {
  //   flex-direction: column-reverse;
  //   .location,
  //   .write-review {
  //     width: 100%;
  //   }
  // }
  .location {
    width: 100%;
    height: 500px;
    clip-path: polygon(0 100px, 100% 0, 100% calc(100% - 100px), 0 100%);
    @media (max-width: 1023px) {
      width: 100%;
    }
  }
  .write-review {
    width: 40%;
    border-radius: 5px;
    height: inherit;
    padding: 15px;
    @media (max-width: 1023px) {
      width: 100%;
    }
  }
}
.final-footer {
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  // box-shadow: var(--main-shadow);
  margin-top: 10px;
  span {
    text-transform: uppercase;
    color: var(--main-color);
  }
}
</style>
