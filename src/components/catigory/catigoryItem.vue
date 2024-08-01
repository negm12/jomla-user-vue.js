<template>
  <div class="cat">
    <router-link
      :to="{
        name: 'products',
        query: {
          catigory: `${cat._id}`,
        },
      }"
    >
      <div
        class="card relative h-48 border-gray-300 overflow-hidden"
        :style="{ backgroundImage: `url(${cat.image})` }"
      >
        <div class="overlay"></div>
        <h2 class="title absolute font-bold text-6xl uppercase text-white">
          {{ cat.name }}
        </h2>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["cat"],
};
</script>

<style scoped lang="scss">
.cat {
  overflow: hidden;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #cfcfcf;
  // box-shadow: var(--main-shadow);
}
.overlay {
  opacity: 0.3;
}
.card {
  border-radius: 5px;
  text-align: center;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  // cursor: pointer;
  transition: all 0.4s ease-in-out;
  height: 300px;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 700px) {
  }

  .title {
    font-size: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 101;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out;
    @media (max-width: 1023px) {
      font-size: 30px;
    }
  }
}
</style>
