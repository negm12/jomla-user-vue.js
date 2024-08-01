<template>
  <div class="mid-home">
    <div class="container">
      <div class="intro">
        <div class="year">2024</div>
        <div class="title">FASHION TRENDS</div>
        <div class="text">special offers</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mid-home {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/images/homeslider/11.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  margin: 30px 0;
  clip-path: polygon(0 100px, 100% 0, 100% calc(100% - 100px), 0 100%);
  box-shadow: var(--main-shadow);
  .intro {
    text-transform: capitalize;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    .year {
      color: var(--main-color);
      font-size: 80px;
      letter-spacing: 20px;
      @media (max-width: 768px) {
        font-size: 55px;
      }
    }
    .title {
      color: #1d1d1d;
      font-size: 40px;
      @media (max-width: 768px) {
        font-size: 27px;
      }
    }
    .text {
      font-size: 30px;
      letter-spacing: 3px;
      color: var(--main-text-color);
      @media (max-width: 768px) {
        font-size: 18px;
      }
    }
  }
}
</style>
