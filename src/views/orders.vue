<template>
  <div class="orders">
    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="orders?.length">
          <table>
            <thead>
              <th>product</th>
              <th>quantity</th>
              <th>color</th>
              <th>size</th>
              <th>price/unit</th>
              <th>sale</th>
              <th>total price</th>
              <th>user</th>
              <th>order state</th>
            </thead>
            <tbody>
              <tr class="item" v-for="item in orders.reverse()" :key="item._id">
                <td class="product-details">
                  <div class="img">
                    <!-- {{ console.log(item.product_id?.productItems) }} -->
                    <img
                      :src="item.product_id.productItems[0].images[0]"
                      alt=""
                    />
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </td>
                <td class="qty">
                  {{ item.quantity }}
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
                    {{ item.price }}
                  </div>
                </td>
                <td>
                  <div class="sale">
                    {{ item.sale }}
                  </div>
                </td>
                <td>
                  <div class="total-price">
                    {{ item.quantity * (item.price - item.sale) }}
                  </div>
                </td>
                <td>{{ item.user.email }}</td>
                <td
                  :style="
                    item.state === 'pending'
                      ? { backgroundColor: 'var(--update-color)' }
                      : item.state === 'rejected'
                      ? { backgroundColor: 'var(--danger-color)' }
                      : { backgroundColor: 'var(--main-color)' }
                  "
                >
                  {{ item.state }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="no-items" v-else>
          no orders
          <router-link to="/" @click="cart_store.close_cart()"
            >continue shopping
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();

const orders = ref([]);
(async () => {
  const res = await axios.get(`api/shop/orders?user=${auth_store.user._id}`);
  orders.value = await res.data.orders;
  // console.log(orders.value[0].product_id.productItems[0].images[0]);
})();
</script>

<style lang="scss" scoped>
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
</style>
