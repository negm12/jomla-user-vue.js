<template>
  <div>
    <div
      class="item relative"
      :class="[theme.theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-light']"
    >
      <div class="badges">
        <!-- <div
          class="new"
          v-if="prod.createdAt >= Date.now() - 10 * 24 * 3600 * 1000"
        >
          new
        </div> -->
        <div class="onsale" v-if="prod.sale">
          on sale
          <span :style="{ color: 'var(--main-color)', fontWeight: 'bolder' }"
            >{{ prod.sale }} $</span
          >
        </div>
      </div>
      <div class="img-wrapper">
        <router-link
          :to="{
            name: 'product_details',
            params: {
              id: prod._id,
            },
          }"
        >
          <div class="overlay bg-transparent opacity-100">
            <div class="images absolute bottom-0 left-0">
              <img
                v-for="(img, i) in prod.productItems[0]?.images"
                :key="i"
                :src="img"
                @mouseenter="updateActiveImage(img)"
                @mouseleave="resetActiveImage"
                alt=""
              />
            </div>
            <div class="actions">
              <span class="cart" @click.prevent="add_to_cart"
                ><i class="fa-solid fa-cart-shopping"></i
              ></span>
            </div>
          </div>
          <img
            class="front img-container"
            :src="prod.productItems[0]?.images[0]"
            alt=""
          />
          <img
            class="back img-container"
            :src="
              activeImage ||
              prod.productItems[0]?.images[1] ||
              prod.productItems[0]?.images[0]
            "
            alt=""
          />
        </router-link>
      </div>
      <div class="details">
        <div class="rate">
          <starRating
            :read-only="true"
            :rating="prod.ratingAvg"
            :increment="0.5"
            :star-size="20"
          />
        </div>
        <p
          class="name"
          :style="{ fontWeight: 'bold', fontSize: '20px', padding: '0px 0' }"
        >
          {{ prod.name }}
        </p>
        <small
          class="price"
          :style="prod.sale ? { textDecoration: 'line-through' } : null"
        >
          {{ prod.price }} $
        </small>
        <h3
          class="price"
          :style="{
            color: 'var(--danger-color)',
            fontWeight: 'bold',
            fontSize: '20px',
          }"
        >
          {{ prod.price - prod.sale }} $
        </h3>
        <ul
          class="colors"
          :style="{ display: 'flex', gap: '10px', marginTop: '10px' }"
        >
          <li
            v-for="(item, i) in prod.productItems"
            :style="{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: item.color,
            }"
          ></li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <teleport to="body">
    <transition name="fade">
      <modal v-if="show_item" @close="closeShowItem">
        <itemPrevwe />
      </modal>
    </transition>
  </teleport> -->
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";
const theme = useThemeStore();
import { ref } from "vue";
// import Product_details from "@/views/product_details.vue";
import starRating from "vue-star-rating";

const props = defineProps(["prod", "badge"]);

// console.log(props.prod.productItems[0].images);
import { useCartStore } from "@/stores/cart";
const cart_store = useCartStore();

const add_to_cart = async () => {
  const prod_cart = ref({
    product: props.prod,
    product_id: props.prod._id,
    color: props.prod.productItems[0].color,
    size: props.prod.productItems[0]?.sizes[0]?.size,
    qty: 1,
  });
  cart_store.add_to_cart(prod_cart.value);
};

// props.prod.productItems[0].images[1]
//   ? props.prod.productItems[0].images[1]
//   : props.prod.productItems[0].images[0]
const activeImage = ref("");
const updateActiveImage = (url) => {
  activeImage.value = new URL(url, import.meta.url);
};
// activeImage.value = props.prod.productItems[0].images[1]
//   ? props.prod.productItems[0].images[1]
//   : props.prod.productItems[0].images[0];
const resetActiveImage = () => {
  activeImage.value = "";
};
</script>

<style lang="scss" scoped>
.badges {
  @apply w-full flex justify-between items-center absolute top-6 left-0 p-3;
  z-index: 41;
  .new {
    background-color: var(--main-color);
    font-size: 16px;
    @apply w-12 h-12 rounded-full grid place-items-center text-white font-bold uppercase;
  }
  .onsale {
    @apply uppercase font-bold text-white -rotate-90 p-2;
    background-color: var(--danger-color);
    // text-decoration: line-through;
  }
}
.overlay:hover {
  & ~ .back {
    transform: translateX(0) !important;
    opacity: 1 !important;
  }
  & ~ .front {
    opacity: 0 !important;
  }
  .actions {
    transform: translateX(0);
  }
  .images {
    transform: translate(0);
  }
}
.img-wrapper {
  @apply w-full h-80 overflow-hidden relative;
  .actions {
    @apply absolute bottom-0 right-0 flex flex-col p-2 pb-0 gap-2;
    z-index: 41;
    transform: translateX(100%);
    transition: all 0.4s ease-in;
    span {
      @apply w-10 h-10 grid  text-white;
      background-color: var(--main-color);
      place-items: center;
      border-radius: 50%;
      transition: all 0.4s ease-in-out;
      opacity: 1;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .images {
    z-index: 41;
    transform: translate(-100%);
    transition: all 0.4s ease-in;
    display: flex;
    flex-direction: column;
    img {
      width: 50px;
      height: 70px;
      opacity: 0.6;
      transition: all 0.4s ease-in;
      &:hover {
        opacity: 1 !important;
        cursor: pointer;
      }
    }
  }
  .front {
    transition: all 0.4s ease-in;
  }
  .back {
    transform: translateX(-50%);
    transition: all 0.4s ease-in;
    opacity: 0;
  }
}
.item {
  overflow: hidden;
  border-radius: 5px;

  width: 300px;
  // box-shadow: var(--main-shadow);
}

.details {
  width: 100%;
  padding: 5px;
}
.img-container {
  @apply w-full h-full absolute top-0 left-0;
}
</style>
