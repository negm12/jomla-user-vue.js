<template>
  <div class="map">
    <a href="https://maps.app.goo.gl/KzKAmdWfnRUTNnBb7" target="_blank">
      <div class="overlay"></div>
      <img src="../assets/images/map.jpg" alt="" />
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.map {
  a {
    position: relative;
    width: 100%;
    height: 100%;
    text-decoration: none;
    overflow: hidden;
    padding: 5px;
    border: 2px solid var(--main-text-color);
    display: inline-block;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      transition: all 0.5s ease-in-out;
      position: relative;
    }
  }
  .overlay {
    &:hover {
      & ~ img {
        transform: scale(1.2);
      }
    }
  }
}
</style>
