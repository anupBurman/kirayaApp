<script setup>

import { onMounted } from 'vue';
import { useDataStore } from '@/store/preData';


const store = useDataStore();

useHead({
    title: 'Welcome to Home Page',
    meta: [
        { name: 'description', content: 'This is Home page description for kiraya app.' },
    ],
})

    
onMounted(() =>{
    store.getProperties();
})

</script>

<template>

  <!-- <addProperty v-if="store.noProp" /> -->
    <Properties></Properties> 
    

</template>