<template>
  <div class="item-prevwe">
    <div class="item-image">
      <img src="../assets//images/homeslider/1.jpg" alt="" />
    </div>
    <div class="item-details">
      <div class="header">
        <div class="item-name">name</div>
        <div class="item-price">price</div>
        <div class="item-colors">colors</div>
        <div class="item-size">size</div>
      </div>
      <div class="description">
        <p class="desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
          earum dolor pariatur voluptatem, veniam alias quaerat quos similique
          unde sint neque, magni, consequatur blanditiis minus deleniti ipsam
          quod accusantium voluptatibus! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit.
        </p>
        <div class="actions">
          <base_btn mode="flat">add to card</base_btn>
          <base_btn mode="flat">view details</base_btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base_btn from "@/components/layout/base_btn.vue";
export default {
  components: { base_btn },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.item-prevwe {
  width: 800px;
  display: flex;
  gap: 10px;
  min-height: inherit;
  padding: 5px;
  max-height: 500px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    width: 400px;
  }
  .item-image {
    flex: 1;
    max-height: 550px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .item-details {
    flex: 1;
    .header {
      border-bottom: 2px dashed var(--main-text-color);
      padding-bottom: 10px;
      text-transform: capitalize;
      color: var(--main-text-color);
      .item-name {
        font-size: 30px;
        font-weight: bold;
      }
      .item-price {
        font-size: 25px;
        color: #000;
      }
    }
    .desc {
      padding: 15px 0;
      color: var(--main-text-color);
      letter-spacing: 1.5px;
      line-height: 1.4;
    }
    .actions {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
