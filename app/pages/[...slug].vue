<script setup>
// definePageMeta({
//     layout: 'custom'
// })
const routes = useRoute();
</script>

<template>
    <div class="text_center">
        <h1> Oopp's </h1>
        <h4> Page you are trying to acccess <span class="text_info"> {{ routes.params.slug.join('/') }} </span>   is not exist on this website. </h4>
        <h4> Please go to <NuxtLink to="/"> Home page </NuxtLink>   </h4>
    </div>
</template>







