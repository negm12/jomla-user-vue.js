<template>
  <div>
    <div class="cart">
      <div class="content container">
        <transition name="fade" mode="out-in">
          <div v-if="cart_store.get_cart?.length">
            <table>
              <thead>
                <th>product</th>
                <th>quantity</th>
                <th>color</th>
                <th>size</th>
                <th>price/unit</th>
                <th>total price</th>
                <th>actions</th>
              </thead>
              <tbody>
                <tr class="item" v-for="item in cart_prods">
                  <td class="product-details">
                    <div class="img">
                      <!-- {{ item }} -->
                      <img :src="item.item.productItems[0].images[0]" alt="" />
                    </div>
                    <div class="name">
                      {{ item.item.name }}
                    </div>
                  </td>
                  <td class="qty">
                    {{ qty }}
                    <select v-model="qty" :style="{ color: '#000' }">
                      <option
                        v-for="(q, i) in item.item?.productItems[
                          item.item.productItems.indexOf(
                            item.item.productItems.find(
                              (i) => i.color === item.color
                            )
                          )
                        ].sizes[
                          item.item.productItems[
                            item.item.productItems.indexOf(
                              item.item.productItems.find(
                                (i) => i.color === item.color
                              )
                            )
                          ].sizes.indexOf(
                            item.item.productItems[
                              item.item.productItems.indexOf(
                                item.item.productItems.find(
                                  (i) => i.color === item.color
                                )
                              )
                            ].sizes.find((s) => s.size === item.size)
                          )
                        ]?.quantity"
                        :key="i"
                        :value="q"
                      >
                        {{ q }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <div
                      class="color"
                      :style="{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: `${item.color}`,
                      }"
                    ></div>
                  </td>
                  <td>
                    <div class="size">{{ item.size }}</div>
                  </td>
                  <td>
                    <div class="price">
                      {{ item.item.price - item.item.sale }}
                    </div>
                  </td>
                  <td>
                    <div class="total-price">
                      {{ item.qty * (item.item.price - item.item.sale) }}
                    </div>
                  </td>
                  <td>
                    <div class="actions">
                      <div
                        class="delete"
                        @click="delete_from_cart(item.item._id)"
                      >
                        <i class="fa-regular fa-trash-can"></i>
                      </div>
                      <div
                        class="view-details"
                        @click="show_product_details(item.item._id)"
                      >
                        <i class="fa-regular fa-eye"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="confirm-orders">
              <button @click="confirm_orders">confirm this orders</button>
            </div>
          </div>

          <div class="no-items" v-else>
            no items in your cart
            <router-link to="/" @click="cart_store.close_cart()"
              >continue shopping
            </router-link>
          </div>
        </transition>

        <!-- {{
              // calc_item_qty(item)
              item.item.productItems[
                item.item.productItems.indexOf(
                  item.item.productItems.find((i) => i.color === item.color)
                )
              ].sizes[
                item.item.productItems[
                  item.item.productItems.indexOf(
                    item.item.productItems.find((i) => i.color === item.color)
                  )
                ].sizes.indexOf(
                  item.item.productItems[
                    item.item.productItems.indexOf(
                      item.item.productItems.find((i) => i.color === item.color)
                    )
                  ].sizes.find((s) => s.size === item.size)
                )
              ].quantity
            }} -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import axios from "axios";
import { useThemeStore } from "@/stores/theme";
const theme_store = useThemeStore();

import { computed, ref } from "vue";
const cart_store = useCartStore();
const cart_items = ref(cart_store.cart);

const cart_prods = ref([]);
const order_items = ref([]);

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();

let qty = ref(0);

const get_cart_prods = async () => {
  for (let i = 0; i < cart_items.value?.length; i++) {
    const res = await axios.get(
      `api/shop/products/${cart_items.value[i].product_id}`
    );
    const item = await res.data.product;
    if (!!item) {
      qty.value = cart_items.value[i].qty;
      cart_prods.value.push({
        item,
        size: cart_items.value[i].size,
        color: cart_items.value[i].color,
        qty: cart_items.value[i].qty,
      });
    }
  }
};

get_cart_prods();

const delete_from_cart = (id) => {
  cart_store.remove_from_cart(id);
  cart_prods.value = [];
  cart_items.value = cart_store.cart;
  get_cart_prods();
};
import { useRouter } from "vue-router";

const router = useRouter();

const show_product_details = (id) => {
  router.push({
    name: "product_details",
    params: { id },
  });
  cart_store.close_cart();
};

// console.log(cart_store.cart);

// console.log(order_items.value);

const confirm_orders = async () => {
  order_items.value = await cart_prods.value.map((item) => ({
    user: auth_store.user._id,
    product_id: item.item._id,
    name: item.item.name,
    color: item.color,
    size: item.size,
    quantity: qty.value,
    price: item.item.price,
    sale: item.item.sale,
  }));
  // console.log(order_items.value);
  try {
    await axios.post(
      "api/shop/orders",

      order_items.value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_store.token}`,
        },
      }
    );
    // localStorage.removeItem("cart");
    cart_store.remove_cart();
    get_cart_prods();
  } catch (err) {
    console.log(err);
  }
};

// {
//   user,
//   prod_id,
// name,
// color ,
// size ,
// qty,
// price,
// sale,

// }

// console.log("cart", cart_items.value, cart_prods.value);
// const calc_item_qty = computed((item) => {
//   return item.item.productItems[
//     item.item.productItems.indexOf(
//       item.item.productItems.find((i) => i.color === item.color)
//     )
//   ];
// });
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  height: 100vh;
  position: relative;
  // background-color: aqua;
  z-index: 10000;
  overflow: scroll;
  .content {
    z-index: 100000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    table {
      text-align: left;
      font-weight: bold;
      thead {
        border-bottom: 1px solid var(--danger-color);
        color: var(--update-color);
        th {
          padding: 20px;
        }
      }
      tbody {
        tr {
          // padding: 20px !important;
          border-bottom: 1px solid var(--main-text-color);
          transition: all 0.3s ease-in-out;
          td {
            padding: 15px 20px;
          }
        }
      }
    }
    .item {
      padding: 10px;
      border-radius: 10px;
      .product-details {
        display: flex;
        align-items: center;
        gap: 10px;
        .img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        .name {
          color: var(--main-color);
        }
      }
      .actions {
        display: flex;
        gap: 10px;
        & > div {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          cursor: pointer;
        }
        .delete {
          background-color: var(--danger-color);
        }
        .view-details {
          background-color: var(--update-color);
        }
      }
    }
  }
}

.no-items {
  background-color: var(--danger-color);
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  a {
    color: var(--main-color);
    text-transform: capitalize;
  }
}

.confirm-orders {
  text-align: center;
  margin: 30px;
  button {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--update-color);
    color: #fff;
    font-weight: bold;
    text-transform: capitalize;
  }
}

/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: #949494;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--main-color);
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
}
</style>
