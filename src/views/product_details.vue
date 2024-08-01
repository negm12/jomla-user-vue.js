<template>
  <div class="product-details">
    <div class="container">
      <div class="item-details">
        <div class="image" v-if="current_item.color">
          <img
            :src="!!active_img ? active_img : current_item.images[0]"
            alt=""
          />
          <div class="sub-images">
            <img
              v-for="(img, i) in current_item.images"
              :key="i"
              :src="img"
              alt=""
              @mouseenter="set_active_img(img)"
              @mouseleave="reset_active_img(current_item.images[0])"
            />
          </div>
        </div>
        <div class="details">
          <h2 class="prod-name block text-center mb-6">{{ product.name }}</h2>
          <div
            class="price"
            :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }"
          >
            <p class="prod-price">{{ product.price }} $</p>
            <p
              class="sale"
              :style="{
                padding: '5px 10px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '10px',
                backgroundColor: 'var(--danger-color)',
                width: 'fit-content',
                fontWeight: 'bold',
                color: '#fff',
              }"
            >
              {{ product.sale }} $ on sale
            </p>
          </div>
          <ul class="prod-colors">
            <li
              v-for="(item, i) in product.productItems"
              :key="i"
              :style="
                item.sizes.length
                  ? { backgroundColor: `${item.color}` }
                  : { display: 'none' }
              "
              :class="{ active: active_color === `${item.color}` }"
              @click="toggle_active_color(item)"
            ></li>
          </ul>
          <ul class="prod-size" v-if="!!current_item.sizes">
            <li
              v-for="(size, i) in current_item.sizes"
              :key="i"
              :class="{ active: active_size === size.size }"
              @click="toggle_active_size(size)"
            >
              {{ size.size }}
            </li>
          </ul>
          <div class="state">
            <transition name="fade" mode="out-in">
              <span
                v-if="!check_item_state"
                :style="{
                  backgroundColor: 'var(--update-color)',
                  display: 'block',
                  padding: '10px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#fff',
                }"
              >
                in stock
              </span>
              <span
                v-else
                :style="{
                  backgroundColor: 'var(--danger-color)',
                  display: 'block',
                  padding: '10px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#fff',
                }"
                >out of stock</span
              >
            </transition>
          </div>
          <div class="prod-qty">
            <div class="decrees" @click="decrees_qty"><</div>
            <input type="number" disabled v-model="qty" />
            <div class="increes" @click="increes_qty">></div>
          </div>

          <!-- 
          
          -->
          <transition name="fade">
            <button
              @click="add_to_cart"
              class="add-to-cart"
              :hidden="check_item_state"
            >
              add to cart
            </button>
          </transition>
          <!-- 
          
          
          -->
          <p class="description">
            {{ product.description }}
          </p>
        </div>
      </div>

      <!-- 
      
      
      related products 
      
      
      
      -->
      <div class="related-products">
        <section_header>
          <h2 class="sec-head-h2">related products</h2>
        </section_header>
        <div class="related-items">
          <product_item v-for="(prod, i) in related_prods" :key="i" :prod />
        </div>
      </div>

      <!-- 
      
      
      reviews 
      
      
      -->
    </div>
    <div class="comments">
      <Product_reviews :reviews="product.reviews" />
    </div>
    <div class="container add-comment">
      <Product_review_form @send_review="send_review" />
    </div>

    <!-- 
    
    location-->
    <!-- <div class="location">
      <Location />
    </div> -->

    <!--  -->
    <Loading v-if="load"></Loading>
    <Teleport to="body">
      <transition name="fade">
        <Modal v-if="error.state" @close="close_error" mode="error">
          <template #header>{{ error.state }}</template>
          <template #content>{{ error.message }}</template>
        </Modal>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import product_item from "@/components/product_item.vue";
import section_header from "@/components/layout/section_header.vue";
import Loading from "@/components/layout/loading.vue";
import Modal from "@/components/layout/modal.vue";
import axios from "axios";

import { useRoute } from "vue-router";
import Location from "@/components/location.vue";
import Product_reviews from "@/components/layout/product_reviews.vue";
import Product_review_form from "@/components/layout/product_review_form.vue";

const route = useRoute();
const product = ref({});
const current_item = ref({});
const current_size = ref({});
const active_size = ref("");
const active_color = ref("");

const related_prods = ref([]);

const load = ref(false);
const error = ref({});

// const prod_id = ref(route.params.id);

//
const fetch_prod_details_and_related = async () => {
  load.value = true;
  try {
    const res = await axios.get(`api/shop/products/${route.params.id}`);
    product.value = await res.data.product;
    current_item.value = await res.data.product.productItems[0];
    current_size.value = current_item.value.sizes[0];
    active_size.value = current_size.value.size;
    active_color.value = current_item.value.color;

    const related = await axios.get(
      `api/shop/products?catigory=${product.value.catigory._id}`
    );
    related_prods.value = await related.data.products;
    // console.log("related", related_prods.value);

    // console.log(product.value);
  } catch (err) {
    error.value = err?.response?.data;
  }
  load.value = false;
};

fetch_prod_details_and_related();

watch(
  () => route.params.id,
  () => {
    fetch_prod_details_and_related();
  }
);

const close_error = () => {
  error.value = {};
};

// const set_current_item = (item) => {
//   current_item.value = item;
// };

const active_img = ref("");

const set_active_img = (img) => {
  active_img.value = img;
};
const reset_active_img = (img) => {
  active_img.value = img;
};

// const set_current_size = (size) => {
//   current_item.value = size;
// };

const qty = ref(1);
const toggle_active_size = (size) => {
  active_size.value = size.size;
  current_size.value = size;
};
const toggle_active_color = (item) => {
  active_color.value = item.color;
  current_item.value = item;
  //
  current_size.value = item.sizes[0];
  active_size.value = item.sizes[0].size;
  // console.log(current_item.value);
};

const increes_qty = () => {
  qty.value += 1;
};
const decrees_qty = () => {
  if (qty.value <= 1) {
    return (qty.value = 1);
  } else {
    qty.value -= 1;
  }
};

const check_item_state = computed(() => {
  // console.log(qty.value, current_size.value.quantity);
  // console.log(qty.value <= current_size.value.quantity);
  return qty.value >= current_size.value.quantity;
});
import { useRouter } from "vue-router";
const router = useRouter();

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();

import { useReviewStore } from "@/stores/reviews";
const rev_store = useReviewStore();

const send_review = async (rating, review, available_review_length) => {
  load.value = true;
  if (auth_store.get_is_auth) {
    // console.log(available_review_length.value);
    if (available_review_length <= 0) {
      return;
    }
    try {
      // console.log(product.value._id);
      const res = await axios.post(
        "api/shop/reviews",
        {
          rating,
          review,
          user: auth_store.user._id,
          product: await product.value._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_store.token}`,
          },
        }
      );
      // console.log(await res.data);
      // await rev_store.fetch_reviews();
      await fetch_prod_details_and_related();
      // review.value = "";
      // rating.value = "";
    } catch (err) {
      // console.log(err.response);
    }
  } else {
    router.push("/auth");
  }
  load.value = false;
};

import { useCartStore } from "@/stores/cart";
const cart_store = useCartStore();

// console.log(cart_store.get_cart);

const add_to_cart = async () => {
  const prod_cart = ref({
    product: await product.value,
    product_id: await product.value._id,
    color: active_color.value,
    size: active_size.value,
    qty: qty.value,
  });
  cart_store.add_to_cart(prod_cart.value);
};

//
//
</script>

<!-- 







-->
<style lang="scss" scoped>
.product-details {
  height: 100%;
}
.item-details {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding-top: 20px;
  // align-items: center;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
  .image {
    width: 450px;
    // box-shadow: var(--main-shadow);
    border-radius: 10px;
    overflow: hidden;
    height: 550px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 400px;
      border-radius: 10px;
    }
    .sub-images {
      display: flex;
      gap: 15px;
      justify-content: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        opacity: 0.5;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .details {
    flex: 1;
    .prod-name {
      font-size: 30px;
      font-weight: bold;
      text-transform: uppercase;
      // color: var(--main-text-color);
    }
    .prod-price {
      color: var(--main-color);
      font-size: 20px;
      margin: 10px 0;
      font-weight: bold;
    }
    .prod-colors {
      display: flex;
      gap: 10px;
      li {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        margin: 10px 0;
        // opacity: 0.5;
      }
    }
    .prod-size {
      display: flex;
      gap: 10px;
      margin: 10px 0;
      user-select: none;
      li {
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--main-color);
        cursor: pointer;
        display: grid;
        place-items: center;
        font-weight: bold;
        box-sizing: border-box;
        opacity: 0.5;
        font-weight: bold;
      }
    }
    .prod-state {
      color: red;
      font-weight: bold;
    }
    .prod-qty {
      display: flex;
      margin: 20px 0;
      .decrees,
      .increes {
        font-weight: bold;
        color: var(--main-text-color);
        font-size: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-color: #eee;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      }
      input {
        width: 60px;
        border-radius: 10px;
        text-align: center;
      }
    }
    .add-to-cart {
      text-align: center;
      text-transform: capitalize;
      background-color: var(--main-color);
      color: var(--main-text-color);
      padding: 10px;
      border-radius: 5px;
      font-weight: bold;
      user-select: none;
    }
    .description {
      color: var(--main-text-color);
      margin-top: 15px;
      line-height: 1.5;
      letter-spacing: 1.5px;
    }
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    .image {
      width: 100%;
      height: 500px;
    }
    .details {
      width: 100%;
      text-align: center;
      margin-top: 30px;
      .prod-size,
      .prod-colors,
      .prod-qty {
        justify-content: center;
      }
    }
  }
}
.related-products {
  margin-top: 100px;
  .related-items {
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
}

.comments {
  margin-top: 70px;
  & > p {
    font-weight: bold;
    margin-bottom: 15px;
    a {
      color: var(--main-color);
    }
  }
  .comment {
    width: 100%;
    .user-info {
      .user-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user-name {
        color: var(--main-color);
        font-weight: bold;
      }
    }
  }
}
.active {
  opacity: 1 !important;
  border: 2px solid#707070;
}
.location {
  margin: 30px 0;
  // clip-path: polygon(0 100px, 100% 0, 100% calc(100% - 100px), 0 100%);
  height: 0px;
}

.add-comment {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
