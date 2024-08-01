<template>
  <section class="homeslider">
    <homeslider />
    <!-- <div v-if="load">loading.....................</div>

    <form @submit.prevent="onsubmit">
      <input type="text" placeholder="cat name " v-model="name" />
      <input type="file" placeholder="image " multiple @change="file_change" />
      <button type="submit">submit</button>
    </form> -->
    <catigories-list />
    <sales-list />
    <mid_home />
    <new-items />
    <our-fitures />
    <testemonials />
  </section>
</template>

<script setup>
import homeslider from "@/components/home_header/homeslider.vue";
import catigoriesList from "@/components/catigory/catigoriesList.vue";
import salesList from "@/components/salesList.vue";
import mid_home from "@/components/home_header/mid_home.vue";
import newItems from "@/components/newItems.vue";
import ourFitures from "@/components/ourFitures.vue";
import testemonials from "@/components/home_header/Testimonials_list .vue";
import { storage } from "@/firbase/firebase";
import { uploadBytes, getDownloadURL, ref as storeRef } from "firebase/storage";
import { ref } from "vue";

// const name = ref("");
// const load = ref(false);
// const img = ref("");

// const file_change = (e) => {
//   // console.log(e.target.files[0]);
//   img.value = e.target.files[0];
// };

// const onsubmit = async () => {
//   load.value = true;
//   // upload image to firebase
//   const storageRef = storeRef(
//     storage,
//     `images/catigories/${name.value}`.replace(" ", "-")
//   );

//   const uploaded_iamge = await uploadBytes(storageRef, img.value);
//   // console.log(uploaded_iamge);
//   const img_url = await getDownloadURL(storageRef);
//   // console.log(img_url);
//   const response = await fetch("http://127.0.0.1:3000/api/shop/catigory", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name: name.value, image: img_url }),
//   });
//   const data = await response.json();
//   console.log(data);

//   // console.log(data.value.catigory);
//   load.value = false;

//   // get image url from firebase
//   // fetch post api to store date (name , imgurl) on mongodb
// };
// const fetCats = async () => {
//   const cats = await (
//     await fetch("http://127.0.0.1:3000/api/shop/catigory")
//   ).json();
//   console.log(cats);
// };
// fetCats();
</script>

<style lang="scss" scoped>
.homeslider {
  width: 100%;
}
</style>
