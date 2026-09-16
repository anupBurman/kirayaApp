<template>
  <div >
    <h1> API call-2 </h1>
    <h6 v-for="(items, index) in posts" :key="index">
        {{ items.name }}
    </h6>
  </div>
</template>
<script setup>
// $fetch method is Recommended for Client-Side Actions in Nuxt (like form submition or action on click events).
import { ref } from 'vue';
const posts = ref([])
    const reslt = await $fetch('https://jsonplaceholder.typicode.com/users')
    posts.value = reslt;
    console.log(reslt)
</script>

// =============================== //


// useFetch method is Recommended for SSR Actions in Nuxt (It automatically handles Server-Side Rendering (SSR) caching. 
// It is not repeated on the browser when the page hydrates).

<!-- <template>
   <div> API2</div>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <pre v-for="(item, index) in data" :key="index">{{ item.uname}} ----- {{ item.email }}</pre>
  </div>
</template>

<script setup >

// POST request with options
const { data, error, pending } = await useFetch('http://localhost/rental_app/api/all_users.php')
console.log(error)
</script> -->