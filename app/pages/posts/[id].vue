<script setup>
defineProps(["id", "title", "body"]);
const route = useRoute();
// console.log(route.params.id)

const { data, error, pending } = await useFetch(`https://dummyjson.com/posts/${route.params.id}`)

</script>
<template>
  <div class="row cardd bg-dark text-light p-4 mb-4">
    <div class="col-lg-4 px-0">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQaqt3enR7H9OL6By2o99l28OOXP9vIcpK3g&s" />
    </div>
    <div class="col-lg-8 px-0 ">

      <div v-if="pending"> Pending....</div>
      <div v-else-if="error"> Something went wrong</div>

      <div v-else>
        <span>ID - {{ data.id }}</span>
        <h3> {{ data.title }} </h3>
        <p> {{ data.body }} </p>
        <NuxtLink to="/posts/">
          <button class="btn btn-dark"> Back </button>
        </NuxtLink>
      </div>


    </div>
  </div>

</template>
<style lang="css" scoped>
.cardd {
  border-radius: 8px;
}
</style>