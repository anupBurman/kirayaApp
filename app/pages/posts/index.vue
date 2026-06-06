<script setup>

const { data, error, pending } = await useFetch('https://dummyjson.com/posts?limit=10')
// const result = data.value;
console.log(data.value.posts)
</script>
<singlePost/>
<template>
    <div class="py-4">
        <h1> All posts </h1>
    </div>
    <div v-if="pending">Loading...</div>
     <div class="text-danger" v-else-if="error"> Something went wrong ! </div>
      <div v-else>
        <div v-for="post in data.posts" :key="post.id">
        <card :id="post.id" :title="post.title" :body="post.body" />
    </div>
      </div>

</template>
